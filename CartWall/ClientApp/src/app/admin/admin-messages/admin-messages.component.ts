import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit {
  contact: any;
    value: string;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  ngOnInit() {
  }
  public async getAll() {
    await this.http.get(`api/Contact`).subscribe(res => this.contact = res)
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      await this.http.delete(`api/Contact/${id}`).subscribe(res => {
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
      this.contact = this.contact.filter(res => {
        return this.result(res).toLocaleLowerCase().match(this.value.toLocaleLowerCase());
      })
    }
  }




 }
