import { RefreshService } from "./../../refresh.service";
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { Card } from '../../Models/card';
import { Order } from '../../Models/order';
import { ToastService } from "angular-toastify";

@Component({
  selector: 'add/order/:id',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  id: any;
  userId: any;
  public order: Order = {
    orderId: '',
    applicationUserId: '',
    firstName: '',
    lastName: '',
    address_1: '',
    address_2: '',
    phoneNumber_1: '',
    phoneNumber_2: '',
    amount:'',
    status: '',
  }
  public card: Card = {
    cardId: '',
    orderId: '',
    cardNo: '',
    cardDate: '',
    cardCode: '',
    cardType: '',
  }
  total: any;
  constructor(private http: HttpClient ,private toast:ToastService,  private refresh:RefreshService, private auth: AuthorizeService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.auth.getUser().subscribe(res => {
      this.userId = res['sub'];
    })
    this.total = localStorage.getItem('totalCost');
   
  }
  ngOnInit() {
  }

  public async addOrder() {
    try {
      const userId = await this.userId;
      const cost = await localStorage.getItem('totalCost');
      let data = {
        applicationUserId: userId,
        firstName: this.order.firstName,
        lastName: this.order.lastName,
        address_1: this.order.address_1,
        address_2: this.order.address_2,
        phoneNumber_1: this.order.phoneNumber_1,
        phoneNumber_2: this.order.phoneNumber_2,
        amount: cost,
        status: 'pending',
      }
      await this.http.post(`api/Orders`, data).subscribe(async res => {
        await this.addCard(res['orderId']);
        await console.log(res);
        await this.refresh.addProduct(0);
        await localStorage.clear();
      })
    }
    catch (e) {
      console.log(e);
    }
    
  }

  public async addCard(orderId) {
    try {
      let data = {
        orderId: orderId,
        cardNo: this.card.cardNo,
        cardDate: this.card.cardDate,
        cardCode: this.card.cardCode,
        cardType: this.card.cardType,
      }
      await this.http.post(`api/Cards`, data).subscribe(async res => {
        await console.log(res);
        await this.toast.success("You have sucessfully placed an order.");
        await this.router.navigate(['/']);
      })
    } catch (e) {
      await console.log(e);
    }
  }











}
