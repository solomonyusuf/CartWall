import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'order/:id',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userId: any;
    id: any;
    user: any;
    message: any;

  constructor(private http: HttpClient, private toast: ToastService, private auth: AuthorizeService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.auth.getUser().subscribe(res => {
      this.userId = res['sub'];
      this.GetAll();
    })
  }

  ngOnInit() {
  }
  public async GetAll() {
    this.http.get(`api/Authentication/${this.userId}`).subscribe(res => {
        this.user = res;
        this.message=res['orders'];
     })
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/orders/${id}`).subscribe(res => {
        this.GetAll();
        this.toast.success("Order has been cancelled.")
        console.log(res);
      })
    } else {
      this.GetAll();
    }

  }
}
