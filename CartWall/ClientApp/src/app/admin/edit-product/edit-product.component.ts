import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  result: { dbPath: '' };
  public product: Product = {
    productId: '',
    shoppingCartId: '4',
    categoryId: '',
    imgPath: '',
    productName: '',
    price: '',
    stock: '',
    quantity: '',
  }
  id: any;
  img: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.product.productId = this.id;
  }


  ngOnInit() {
    this.http.get(`api/Products/${this.id}`).subscribe(res => {
      this.product.productId = res['productId'];
      this.product.categoryId = res['categoryId'];
      this.img = res['imgPath'];
      this.result = { dbPath: res['imgPath'] };
      this.product.productName = res['productName'];
      this.product.shoppingCartId = res['shoppingCartId'];
      this.product.price = res['price'];
      this.product.stock = res['stock'];
    })
  }
  public async Submit() {
    const data = {
      productId: this.product.productId,
      categoryId: this.product.categoryId,
      imgPath: this.result.dbPath,
      productName: this.product.productName,
      shoppingCartId: this.product.shoppingCartId,
      price: this.product.price,
      stock: this.product.stock,
    }
    await this.http.put(`api/Products/${this.id}`, data).subscribe(res => {
      console.log(res);
    })
  }
  public getImg = async (event) => {
    return this.result = event;
  }
}
