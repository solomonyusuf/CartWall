import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Models/product';


@Component({
  selector: 'add/product/:id',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  result: {dbPath:''};
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
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
   this.product.categoryId = this.id;
  }


  ngOnInit() {
  }
  public async Submit() {
    const data = {
      categoryId: this.product.categoryId,
      imgPath: this.result.dbPath,
      productName: this.product.productName,
      shoppingCartId: this.product.shoppingCartId,
      price: this.product.price,
      stock: this.product.stock,
    }
    await this.http.post(`api/Products`, data).subscribe(res => {
      console.log(res);
      this.router.navigate(['/admin/product'])
    })
  }
  public getImg = async (event) => {
    return this.result = event;
  }
}
