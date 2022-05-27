import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin/order/:id',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  id: any;
    orders: any;
    value: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.getAll();
  }
  ngOnInit() {
  }

  public async getAll() {
    await this.http.get(`api/Orders`).subscribe(res => this.orders = res)
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/Orders/${id}`).subscribe(res => {
        this.getAll();
        console.log(res);
      })
    } else {
      this.getAll();
    }
  }
  public result(res) {
    return `${res.orderId}`;
  }

  public search() {
    if (this.value == "") {
      this.getAll();
    } else {
      this.orders = this.orders.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }

 
}
