import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  user: any;
    value: string;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  ngOnInit() {
  }
  public async getAll() {
    await this.http.get(`api/Authentication`).subscribe(res => this.user = res)
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/Authentication/${id}`).subscribe(res => {
        this.getAll();
        console.log(res);
      })
    } else {
      this.getAll();
    }
  }
  public result(res) {
    return `${res.id + res.email + res.userName}`;
  }

  public search() {
    if (this.value == "") {
      this.getAll();
    } else {
      this.user = this.user.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }

}
