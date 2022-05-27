import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  news: any;
  products: any;
  card: any;
  category: any;
  contact: any;
  orders: any;
  roles: any;
  review: any;
  cart: any;
  users: any;
  pending: any;
  totalCost: any;
    delivered: any;

  constructor(private http: HttpClient) { this.getAll(); }

  ngOnInit() {

  }
  public async getAll() {
    await this.http.get(`api/Dashboard/news`).subscribe(res => this.news = res);
    await this.http.get(`api/Dashboard/products`).subscribe(res => this.products = res);
    await this.http.get(`api/Dashboard/card`).subscribe(res => this.card = res);
    await this.http.get(`api/Dashboard/category`).subscribe(res => this.category = res);
    await this.http.get(`api/Dashboard/contact`).subscribe(res => this.contact = res);
    await this.http.get(`api/Dashboard/orders`).subscribe(res => {
      this.orders = res
      let sum: any = 0;
      for (let orderId in this.orders)
        sum += this.orders[orderId].amount;
      return this.totalCost = sum
    });
    await this.http.get(`api/Dashboard/delivered`).subscribe(res => this.delivered = res);
    await this.http.get(`api/Dashboard/roles`).subscribe(res => this.roles = res);
    await this.http.get(`api/Dashboard/reviews`).subscribe(res => this.review = res);
    await this.http.get(`api/Dashboard/cart`).subscribe(res => this.cart = res);
    await this.http.get(`api/Dashboard/users`).subscribe(res => this.users = res);
    await this.http.get(`api/Dashboard/pending`).subscribe(res => this.pending = res);

  }
}
