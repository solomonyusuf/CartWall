import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  category: any;
    value: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetAllCategory();

  }
  public async GetAllCategory() {
    try {
      await this.http.get(`api/Category`).subscribe(res => {
        this.category = res;
        console.log(res);
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/Category/${id}`).subscribe(res => {
        this.GetAllCategory();
          console.log(res);
        })
      } else {
        this.GetAllCategory();
      }
     
    }

  public result(res) {
    return `${res.name}`;
  }

  public search() {
    if (this.value == "") {
      this.GetAllCategory();
    } else {
      this.category = this.category.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }

  }


