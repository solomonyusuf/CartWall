import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  userId: any;
  constructor(private http: HttpClient, private auth: AuthorizeService) {
    this.auth.getUser().subscribe(res => {
      this.userId = res['sub'];
    })
  }
}
