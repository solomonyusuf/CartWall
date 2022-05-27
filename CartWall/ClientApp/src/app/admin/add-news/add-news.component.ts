import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../Models/news';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  
  result: { dbPath: '' };
  public news: News = {
    Id: '',
    ImgPath: '',
    Title: '',
    Body: '',
    Date: '',
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }
  public async Submit() {
    try {
      const input = {
        title: this.news.Title,
        body: this.news.Body,
        imgPath: this.result.dbPath
      }
      await this.http.post(`api/News`, input).subscribe(res => {
        console.log(res);
        this.router.navigate(['/admin/news']);
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  public getImg = async (event) => {
    return this.result = event;
  }
}

