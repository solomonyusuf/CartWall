import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private int = 1;
  private categorySubject = new BehaviorSubject<any>('');
  private cartSubject = new BehaviorSubject<any>('');
  constructor(private http: HttpClient) { }
  getCart() {
    let cartId = localStorage.getItem('shoppingCartId');
    this.http.get(`api/ShoppingCarts/${cartId}`).subscribe(res => { this.cartSubject.next(res) })
    return this.cartSubject.asObservable();
  }


  getCategories() {
    this.http.get(`api/Category`).subscribe(res => { this.categorySubject.next(res) })
    return this.categorySubject.asObservable();
  }
  addProduct(res) {
    this.cartSubject.next(res)
    return this.cartSubject.asObservable();
  }
  removeProduct(res) {
    this.cartSubject.next(res)
    return this.cartSubject.asObservable();
  }
}
