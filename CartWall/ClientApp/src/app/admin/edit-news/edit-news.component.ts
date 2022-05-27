import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../Models/news';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  id: any;
  img: any;
  result: { dbPath: '' };
  public news: News = {
    Id: '',
    ImgPath: '',
    Title: '',
    Body: '',
    Date: '',
  }
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.http.get(`api/News/${this.id}`).subscribe(res => {
      this.img = res['imgPath'];
      this.news.Title = res['title'];
      this.news.Body = res['body'];
      this.news.ImgPath = res['imgPath'];
      this.result = { dbPath: res['imgPath'] };

    })
  }

    ngOnInit() {

    }

  public async Submit() {
    try {
      const input = {
        id:this.id,
        title: this.news.Title,
        body: this.news.Body,
        imgPath: this.result.dbPath
      }
      await this.http.put(`${`api/News/${this.id}`}`, input).subscribe(res => {
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

