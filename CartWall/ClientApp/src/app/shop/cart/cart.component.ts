import { RefreshService } from "./../../refresh.service";
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { ToastService } from "angular-toastify";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any;
  message: string;
  id: any;
  Amount: any[number];
  single: any;
  focus: any;
  Qty: number;
  totalCost: any;
  coup: any;
  items: any;

  constructor(private http: HttpClient, private toast: ToastService, private count: RefreshService, private auth: AuthorizeService, private route: ActivatedRoute, private router: Router) {
    const cartId = localStorage.getItem('shoppingCartId');

    if (!cartId) {
      this.message = 'Product Not Available Temorarily. Sign in or Add product to cart';
      this.id = 1;

    } else {
      this.id = cartId;
      this.refresh();
    }

  }

  ngOnInit() {
  }
  public async cartIntitialize(qty) {
    const data = localStorage.setItem('items', qty);
    return data;
  }

  public async refresh() {
    await this.http.get(`api/ShoppingCarts/${this.id}`).subscribe(res => {
      if (res != null) {
        this.cart = res;
        this.toast.success("You have sucessfully fetched cart.");
        this.count.removeProduct(res);

      } else {

        this.message = 'Add product to cart';
      }

    })
  }
  public async clear() {
    if (window.confirm("are you sure you want clear your cart ?")) {
      await this.http.delete(`api/ShoppingCarts/${this.id}`).subscribe(async res => {
        await localStorage.removeItem('shoppingCartId');
        this.ngOnInit();
        console.log(res);
      })
    } else {
      this.ngOnInit();
    }
  }

  public async remove(id, productId) {
    if (window.confirm("are you sure you want to remove this product ?")) {
      await this.http.delete(`api/CollectProduct/${id}`).subscribe(res => {
        localStorage.removeItem(productId);
        this.refresh();
        this.toast.success("You have sucessfully removed product.")

      })
    } else {
      this.refresh();
    }

  }
  public async Call(id) {
    await this.http.get(`api/CollectProduct/${id}`).subscribe(res => {
      this.calculate(id, res['quantity'], res['price'], res['imgPath'], res['productName'],);
    })

  }
  public async calculate(id, Qty, price, imgPath: any, productName: any) {
    this.Amount = (Qty * price);
    const data = {
      CollectId: id,
      ShoppingCartId: this.id,
      Amount: this.Amount,
      Quantity: Qty,
      Price: price,
      imgPath,
      productName
    }
    await this.http.put(`api/CollectProduct/${id}`, data).subscribe(res => {
      this.refresh();
      console.log(res);
    })
  }

  public async total() {
    let sum: any = 0;
    for (let collectId in this.cart.products)
      sum += this.cart.products[collectId].amount;
    return this.totalCost = sum, localStorage.setItem('totalCost', this.totalCost);
  }


  public async quantity(quantity: any[number]) {
    let sum = 0;
    for (let collectId in this.cart.products)
      sum += this.cart.products[collectId].quantity;
    return this.Qty = sum;
  }

  /* total(products) {
    let sum = 0;
     for (let collectId in products)
       sum += products[collectId].price;
    return this.focus = sum;
  }*/

  public async increase(collectId: any, Qty: number, price: number, imgPath: any, productName: any) {
    const data = (Qty + 1);
    const input = {
      collectId,
      shoppingCartId: this.id,
      Quantity: data,
      Price: price,
      imgPath,
      productName

    }
    await this.http.put(`api/CollectProduct/${collectId}`, input).subscribe(async res => {
      await this.quantity(Qty);
      await this.Call(collectId);
    })
  }

  public async decrease(collectId: any, Qty: number, price: number, imgPath: any, productName: any) {
    if (Qty <= 1) {
      this.coup = (Qty);
      const input = {
        collectId,
        shoppingCartId: this.id,
        Quantity: this.coup,
        Price: price,
        imgPath,
        productName
      }
      await this.http.put(`api/CollectProduct/${collectId}`, input).subscribe(async res => {
        await this.quantity(Qty);
        await this.Call(collectId);
      })
    } else {
      this.coup = (Qty - 1);
      const input = {
        collectId,
        shoppingCartId: this.id,
        Quantity: this.coup,
        Price: price,
        imgPath,
        productName
      }
      await this.http.put(`api/CollectProduct/${collectId}`, input).subscribe(async res => {
        await this.quantity(Qty);
        await this.Call(collectId);
      })
    }

  }

  public async makeOrder(id, totalCost) {
    localStorage.setItem('totalCost', totalCost);
    return `/add/order/${id}`;
  }





}
