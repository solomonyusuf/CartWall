import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Role from '../../Models/role';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  public role: Role = {
    id: '',
    name: '',
    normalizedName: '',
    concurrencyStamp: '',
  }
    id: any;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.http.get(`api/Role/${this.id}`).subscribe(res => {
      this.role.id = this.id;
      this.role.name = res['name'];
      this.role.normalizedName = res['normalizedName'];
      this.role.concurrencyStamp = res['concurrencyStamp'];
    })
  }

  ngOnInit() {
  }
  public async Submit() {
    const data = {
      id: this.role.id,
      name: this.role.name,
      normalizedName: this.role.name,
      concurrencyStamp: this.role.concurrencyStamp
    }
    await this.http.post(`api/Role`, data).subscribe(res => {
      console.log(res);
      this.router.navigate(['/admin/role'])
    })
  }


}
