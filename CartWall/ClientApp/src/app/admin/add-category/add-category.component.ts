import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../Models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public readonly url = `api/Category`;
  result: { dbPath: '' };
  public category: Category = {
    CategoryId: '',
    Name: '',
    ImgPath:''
  }
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }
  public async Submit() {
    try {
        const input = {
        Name: this.category.Name,
        ImgPath: this.result.dbPath
      }
      await this.http.post(`${this.url}`, input).subscribe(res => {
        console.log(res);
        this.router.navigate(['/admin/category']);
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  public getImg = async(event)=> {
    return this.result = event;
  }
}
