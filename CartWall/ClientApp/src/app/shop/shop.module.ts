import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';

import { CategoryComponent } from './category/category.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { RouterModule } from '@angular/router';
import { AuthorizeInterceptor } from '../../api-authorization/authorize.interceptor';
import { NewsComponent } from './news/news.component';
import { AuthorizeGuard } from '../../api-authorization/authorize.guard';



@NgModule({
  declarations: [CartComponent, CategoryComponent, OrderComponent, AddOrderComponent, PaymentComponent, NewsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AngularToastifyModule,
    RouterModule.forRoot([
      { path: 'cart/:id', component: CartComponent, canActivate: [AuthorizeGuard] },
      { path: 'category/:id', component: CategoryComponent },
      { path: 'all/orders/:id', component: OrderComponent, canActivate: [AuthorizeGuard] },
      { path: 'add/order/:id', component: AddOrderComponent, canActivate: [AuthorizeGuard] },
      { path: 'order/:id', component: OrderComponent, canActivate: [AuthorizeGuard] },
      { path: 'payment', component: PaymentComponent },
      { path: 'news', component: NewsComponent },

    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    ToastService,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ShopModule { }
