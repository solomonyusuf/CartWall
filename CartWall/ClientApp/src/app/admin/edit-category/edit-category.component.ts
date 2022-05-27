import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../Models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  public readonly url = `api/Category`;
  result: { dbPath: '' };
  public category: Category = {
    CategoryId: '',
    Name: '',
    ImgPath: ''
  }
    id: any;
    img: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.http.get(`${this.url}/${this.id}`).subscribe(res => {
      this.category.Name = res['name'];
      this.category.ImgPath = res['imgPath'];
      this.img = res['imgPath'];
      this.result = { dbPath: res['imgPath'] };
      
    })
  }

  public async useImg() {
    if (window.confirm('Do you want to continue with existing image')) {
      const input = {
        CategoryId: this.id,
        Name: this.category.Name,
        ImgPath: this.category.ImgPath
      }
      await this.http.put(`${this.url}/${this.id}`, input).subscribe(res => {
        console.log(res);
        this.router.navigate(['/admin/category']);
      })
    }
  }

  public async Submit() {
    try {
      const input = {
        CategoryId: this.id,
        Name: this.category.Name,
        ImgPath: this.result.dbPath
      }
      await this.http.put(`${this.url}/${this.id}`, input).subscribe(res => {
        console.log(res);
        this.router.navigate(['/admin/category']);
      })
    }
    catch (e) {
      window.alert('upload a new image');
      console.log(e);
    }
  }
  public getImg = async (event) => {
    return this.result = event;
  }
}
