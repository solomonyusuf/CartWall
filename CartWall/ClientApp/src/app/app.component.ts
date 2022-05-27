
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Output, ViewChild } from '@angular/core';
import { CartComponent } from './shop/cart/cart.component';
import { get_cart } from './store/actions';
import { IAppState } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';


  constructor(private http: HttpClient) {

  }


}

