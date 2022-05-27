import { RefreshService } from "./../../refresh.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from "src/api-authorization/authorize.service";
import { App } from "src/app/Models/user";
import { ToastService } from "angular-toastify";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  products: any;
  isAuthenticated: any;
  intialized: boolean;
  public quantity: 0;
  public app: App = {
    applicationUserId: ''
  }
    value: any;
  constructor(private http: HttpClient, private toast: ToastService, private auth: AuthorizeService, private refresh: RefreshService) {
  this.isAuthenticated = this.auth.isAuthenticated();
}

  ngOnInit(){
    this.getAll();
  }
 public async getAll(){
  await this.http.get(`api/Products`).subscribe(res => {
    this.products = res;
    this.toast.success("You have sucessfully fetched the products.")
    console.log(res);
  })
  await this.auth.getUser().subscribe(res => {
    this.app.applicationUserId = res['sub'];
  })
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
        await this.http.get(`api/ShoppingCarts/${cartId}`).subscribe(async res => {
          await this.refresh.addProduct(res);
          await this.toast.success("Product added to Cart.")
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
          await this.http.get(`api/ShoppingCarts/${res['shoppingCartId']}`).subscribe(async res => {
            await this.refresh.addProduct(res);
            await this.toast.success("Product added to Cart.")
          })
          await localStorage.setItem(productId, productId);

        })
      })
    }
  }
  catch (e) {
    console.log(e);
  }
}

  public result(res) {
    return `${res.productName}`;
  }

  public search() {
    if (this.value == "") {
      this.getAll();
    } else {
      this.products = this.products.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }







}


