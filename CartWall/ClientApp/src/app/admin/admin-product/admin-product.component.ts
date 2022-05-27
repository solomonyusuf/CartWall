import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: any;
    value: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProduct();
  }
  public async getProduct() {
    await this.http.get(`api/Products`).subscribe(res => {
      this.products = res;
      console.log(res);
    })
  }
  public async delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/Products/${id}`).subscribe(res => {
        console.log(res);
        this.getProduct();
      })
    } else {
      this.getProduct();
    }
  }
  public result(res) {
    return `${res.productName}`;
  }

  public search() {
    if (this.value == "") {
      this.getProduct();
    } else {
      this.products = this.products.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }

}
