import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from '../authorize.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;
  userId: any;
  image: any;

  constructor(private authorizeService: AuthorizeService, private http: HttpClient) {

  }

  ngOnInit() {
    this.authorizeService.getUser().subscribe(res => {
      this.userId = res['sub'];
      this.http.get(`api/authentication/${this.userId}`).subscribe(res => this.image = res['imgPath'])
    })
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }
}
