import { RefreshService } from "./../../refresh.service";
import { get_cart } from "./../../store/actions";


import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from 'src/app/store/store';

import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { App } from '../../Models/user';
import { ToastService } from "angular-toastify";


@Component({
  selector: 'category/:id',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  product: any;
  category: any;
  id: any;
  public quantity: 0;
  public app: App = {
    applicationUserId: ''
  }
  intialized: boolean;
  isAuthenticated: any;
    value: string;
  constructor(private http: HttpClient, private auth: AuthorizeService, private toast: ToastService, private route: ActivatedRoute, private refresh: RefreshService, private router: Router) {
    this.id = this.route.snapshot.params['id'];
//this.route.snapshot.params['category'];
    this.GetAllCategory();
    this.isAuthenticated = this.auth.isAuthenticated();
    this.auth.getUser().subscribe(res => {
      this.app.applicationUserId = res['sub'];
    })

  }

  ngOnInit() {
  }

  public result(res) {
    return `${res.productName}`;
  }

  public search() {
    if (this.value == "") {
      this.GetAllCategory();
    } else {
      this.category['products'] = this.category['products'].filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }

  public async cartIntitialize(qty) {
    const data = localStorage.setItem('items', qty);
    return data;
  }

  public async GetAllCategory() {
    try {
      await this.http.get(`api/Category/${this.id}`).subscribe(res => {
        this.category = res;
        this.toast.success("sucessfully fetched products .")
        //this.initializeProduct();
        console.log(res);
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  public async initializeProduct(productId) {
    try {
      const item = localStorage.getItem(`${productId}`);
      if (productId = item) {
        this.intialized = true;
      } else {
        this.intialized = false;
      }

    }
    catch (e) {
      console.log(e);
    }
  }

  public async AddToCart(productId, imgPath, productName, price) {
    try {
      const cartId = await localStorage.getItem('shoppingCartId');
      if (cartId) {
        const data: any = {
          productId,
          imgPath,
          Quantity: 1,
          productName,
          price,
          amount: (price * 1),
          shoppingCartId: cartId
        }

        await this.http.post(`api/CollectProduct`, data).subscribe(async res => {
          await this.http.get(`api/ShoppingCarts/${cartId}`).subscribe(res => {
            this.refresh.addProduct(res);
            this.toast.success("Product added to cart sucessfully.")
          })
          await localStorage.setItem(productId, productId);

        })
      } else {
        const input = { applicationUserId: this.app.applicationUserId }
        await this.http.post(`api/ShoppingCarts`, input).subscribe(async res => {
          localStorage.setItem('shoppingCartId', `${res['shoppingCartId']}`);
          const data: any = {
            productId,
            imgPath,
            Quantity: 1,
            productName,
            price,
            amount: (price * 1),
            shoppingCartId: `${res['shoppingCartId']}`
          }
          await this.http.post(`api/CollectProduct`, data).subscribe(async res => {
            await this.http.get(`api/ShoppingCarts/${res['shoppingCartId']}`).subscribe(res => {
              this.refresh.addProduct(res);
              this.toast.success("Product added to cart sucessfully.")
            })
            await localStorage.setItem(productId, productId);

          })
        })
      }
    }
    catch (e) {
      console.log(e);
      this.toast.error("an error occured.")
    }
  }












}
