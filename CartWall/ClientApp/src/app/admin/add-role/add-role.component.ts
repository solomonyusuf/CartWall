import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Role from '../../Models/role';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  
  public role: Role = {
    id:'',
    name: '',
    normalizedName: '',
    concurrencyStamp: '',
  }


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  public async Submit() {
    const data = {
      name: this.role.name,
      normalizedName: this.role.name,
    }
    await this.http.post(`api/Role`, data).subscribe(res => {
      console.log(res);
      this.router.navigate(['/admin/role'])
    })
  }
 
}
