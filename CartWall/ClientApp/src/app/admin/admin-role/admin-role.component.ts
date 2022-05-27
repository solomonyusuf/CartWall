import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {
  role: any;
    value: string;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  ngOnInit() {
  }
  public async getAll() {
    await this.http.get(`api/Role`).subscribe(res => this.role = res)
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/Role/${id}`).subscribe(res => {
        this.getAll();
        console.log(res);
      })
    } else {
      this.getAll();
    }
  }
  public result(res) {
    return `${res.name}`;
  }

  public search() {
    if (this.value == "") {
      this.getAll();
    } else {
      this.role = this.role.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }

}
