import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {
  news: any;
    value: string;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  ngOnInit() {
  }
  public async getAll() {
    await this.http.get(`api/News`).subscribe(res => this.news = res)
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/News/${id}`).subscribe(res => {
        this.getAll();
        console.log(res);
      })
    } else {
      this.getAll();
    }
  }

  public result(res) {
    return `${res.timeStamp}`;
  }

  public search() {
    if (this.value == "") {
      this.getAll();
    } else {
      this.news = this.news.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }


}
