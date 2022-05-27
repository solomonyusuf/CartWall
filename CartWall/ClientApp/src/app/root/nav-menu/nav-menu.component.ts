import { RefreshService } from "./../../refresh.service";
import { Observable, Subscription } from "rxjs";


import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { get_cart } from '../../store/actions';
import { IAppState } from '../../store/store';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  data: Observable<any>;
  id: any;
  message: string;
  userId: any;
  isAuthenticated: any;
  cart: Observable<any>;

  constructor(private http: HttpClient, private auth: AuthorizeService, private refresh: RefreshService) {

    const cartId = localStorage.getItem('shoppingCartId');
    if (!cartId) {
      this.id = 1;
      this.message = 'Product Not Available Temorarily.';
    } else {
      this.id = cartId;


    }
    this.isAuthenticated = this.auth.isAuthenticated();

  }
  ngOnInit() {
    this.auth.getUser().subscribe(res => {
      this.userId = res['sub'];
    })
    //[routerLink] = "Path(d.categoryId)"
    this.getAll();

  }

  public async getAll() {
    await this.refresh.getCategories().subscribe(res => this.data = res);
    await this.refresh.getCart().subscribe(res => this.cart = res);
  }
  public Path(id) {
    return `/category/${id}`;
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
