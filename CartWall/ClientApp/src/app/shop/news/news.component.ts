import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: any;

  constructor(private http: HttpClient) {
    this.http.get(`api/News`).subscribe(res => this.news = res)
  }

  ngOnInit() {
  }

}
