import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { findIndex } from 'rxjs/operators';
import { AuthorizeService } from '../api-authorization/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  basic: any;
  payLoad: any;

  constructor(private router: Router, private service: AuthorizeService, private http: HttpClient) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let roles = next.data['roles'] as Array<string>;
     this.service.getUser()
      .subscribe(async token => {
        await this.http.get(`api/Authentication/${token['sub']}`).subscribe(async res => {
          
           this.payLoad = `${res['role']}`;
         

          var userRole = this.payLoad;
          if (userRole == roles) {
            return true;
          }
          else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        })

      })


    return true;
  }


}
