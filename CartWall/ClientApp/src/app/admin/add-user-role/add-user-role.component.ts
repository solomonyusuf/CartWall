import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { User } from '../../Models/user';
import UserRole from '../../Models/userRole';

@Component({
  selector: 'add/user/role/:id',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.css']
})
export class AddUserRoleComponent implements OnInit {
  id: any;
  name: any;
  userRole: UserRole = {
    userId: '',
    roleId: '',

  }
  user: any;
  default: any;
  main: any;
  list: any;
  model: User = {
    id: '',
    imgPath: '',
    email: '',
    userName: '',
    phoneNumber: '',
    role: '',
    normalizedUserName: '',
    passwordHash: '',
    securityStamp: '',
    concurrencyStamp: '',
    lockoutEnabled: '',
    accessFailedCount: '',
    normalizedEmail: '',
    phoneNumberConfirmed: '',
    twoFactorEnabled: '',
    lockoutEnd: '',
    emailConfirmed: '',
  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private auth: AuthorizeService, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.name = this.route.snapshot.params['name'];
    this.All();
  }

  ngOnInit() {
  }
  public All() {
    this.http.get(`api/UserRole`).subscribe(res => {
      this.list = res; console.log(res)

      console.log(this.list)
      for (let userId in this.list) {
        const ID = this.list[userId].userId;
        this.http.get(`api/Role/${this.id}`).subscribe(res => {
          this.default = res['name'];
        }); console.log(userId)
        this.http.get(`api/Authentication/${ID}`).subscribe(res => {
          this.main = res['role'];
          this.http.get(`api/Authentication`).subscribe(res => {
            this.user = res;
            this.user = this.user.filter(res => {
              function publish(res) { return `${res.role}` }
              return publish(res).toLocaleLowerCase().match(this.default.toLocaleLowerCase());
            })
          })
        })


      }
    })
  }
  public async submit() {
    try {
      const data = {
        userId: this.userRole.userId,
        roleId: this.id,

      }
      await this.http.post(`api/UserRole`, data).subscribe(res => {
        // this.router.navigate(['admin/role']);
        let cont = res['userId'];
        this.getAll(cont);
        this.All();
        this.userRole.userId = null;
      })
    }
    catch (e) {
      console.log(e);
    }
  }
  public async modifyClient(id) {
    const data = {
      id: id,
      imgPath: this.model.imgPath,
      email: this.model.email,
      userName: this.model.userName,
      phoneNumber: this.model.phoneNumber,
      normalizedUserName: this.model.normalizedUserName,
      passwordHash: this.model.passwordHash,
      securityStamp: this.model.securityStamp,
      role: this.name,
      concurrencyStamp: this.model.concurrencyStamp,
      lockoutEnabled: this.model.lockoutEnabled,
      accessFailedCount: this.model.accessFailedCount,
      normalizedEmail: this.model.normalizedEmail,
      phoneNumberConfirmed: this.model.phoneNumberConfirmed,
      twoFactorEnabled: this.model.twoFactorEnabled,
      lockoutEnd: this.model.lockoutEnd,
      emailConfirmed: this.model.emailConfirmed,
    }
    await this.http.put(`api/Authentication/${id}`, data).subscribe(res => { console.log(res); this.All(); })
  }


  public async getAll(id) {
    await this.http.get(`api/Authentication/${id}`).subscribe(res => {
      this.model.imgPath = res['imgPath'];
      this.model.email = res['email'];
      this.model.userName = res['userName'];
      this.model.phoneNumber = res['phoneNumber'];
      this.model.normalizedUserName = res['normalizedUserName'];
      this.model.passwordHash = res['passwordHash'];
      this.model.securityStamp = res['securityStamp'];
      this.model.concurrencyStamp = res['concurrencyStamp'];
      this.model.lockoutEnabled = res['lockoutEnabled'];
      this.model.accessFailedCount = res['accessFailedCount'];
      this.model.normalizedEmail = res['normalizedEmail'];
      this.model.phoneNumberConfirmed = res['phoneNumberConfirmed'];
      this.model.twoFactorEnabled = res['twoFactorEnabled'];
      this.model.lockoutEnd = res['lockoutEnd'];
      this.model.emailConfirmed = res['emailConfirmed'];
      this.modifyClient(id);
    })
  }
  public async Delete(id) {
    if (window.confirm("are you sure you want to delete this ?")) {
      this.getRole(id);

    } else {
      this.All();
    }
  }


  // update user

  public async modifyRole(id) {
    const data = {
      id: id,
      imgPath: this.model.imgPath,
      email: this.model.email,
      userName: this.model.userName,
      phoneNumber: this.model.phoneNumber,
      normalizedUserName: this.model.normalizedUserName,
      passwordHash: this.model.passwordHash,
      securityStamp: this.model.securityStamp,
      role: 'User',
      concurrencyStamp: this.model.concurrencyStamp,
      lockoutEnabled: this.model.lockoutEnabled,
      accessFailedCount: this.model.accessFailedCount,
      normalizedEmail: this.model.normalizedEmail,
      phoneNumberConfirmed: this.model.phoneNumberConfirmed,
      twoFactorEnabled: this.model.twoFactorEnabled,
      lockoutEnd: this.model.lockoutEnd,
      emailConfirmed: this.model.emailConfirmed,
    }
    await this.http.put(`api/Authentication/${id}`, data).subscribe(res => { console.log(res); this.All(); })
  }


  public async getRole(id) {
    await this.http.get(`api/Authentication/${id}`).subscribe(res => {
      this.model.imgPath = res['imgPath'];
      this.model.email = res['email'];
      this.model.userName = res['userName'];
      this.model.phoneNumber = res['phoneNumber'];
      this.model.normalizedUserName = res['normalizedUserName'];
      this.model.passwordHash = res['passwordHash'];
      this.model.securityStamp = res['securityStamp'];
      this.model.concurrencyStamp = res['concurrencyStamp'];
      this.model.lockoutEnabled = res['lockoutEnabled'];
      this.model.accessFailedCount = res['accessFailedCount'];
      this.model.normalizedEmail = res['normalizedEmail'];
      this.model.phoneNumberConfirmed = res['phoneNumberConfirmed'];
      this.model.twoFactorEnabled = res['twoFactorEnabled'];
      this.model.lockoutEnd = res['lockoutEnd'];
      this.model.emailConfirmed = res['emailConfirmed'];
      this.modifyRole(id);
    })
  }




}

