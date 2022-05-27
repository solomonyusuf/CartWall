import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { User } from '../../Models/user';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  result: { dbPath: '' };
  userId: any;
  user: any;
  id: any;
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
    img: any;


  constructor(private auth: AuthorizeService, private toast: ToastService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.auth.getUser().subscribe(res => {
      this.userId = res['sub'];
      this.http.get(`api/Authentication/${this.userId}`).subscribe(res => this.user = res)
    })
  }

  ngOnInit() {
    this.getAll();
  }
  public async getAll() {
    await this.http.get(`api/Authentication/${this.userId}`).subscribe(res => {
      this.user = res;
      this.model.imgPath = res['imgPath'];
      this.model.email = res['email'];
      this.model.userName = res['userName'];
      this.model.phoneNumber = res['phoneNumber'];
      this.model.role = res['role'];
      this.result = { dbPath: res['imgPath'] };
      this.img = res['imgPath'];
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
    })
  }

  public async submit() {
    const data = {
      id: this.id,
      imgPath: this.result.dbPath,
      email: this.model.email,
      userName: this.model.userName,
      phoneNumber: this.model.phoneNumber,
      normalizedUserName: this.model.normalizedUserName,
      passwordHash: this.model.passwordHash,
      securityStamp: this.model.securityStamp,
      role: this.model.role,
      concurrencyStamp: this.model.concurrencyStamp,
      lockoutEnabled: this.model.lockoutEnabled,
      accessFailedCount: this.model.accessFailedCount,
      normalizedEmail: this.model.normalizedEmail,
      phoneNumberConfirmed: this.model.phoneNumberConfirmed,
      twoFactorEnabled: this.model.twoFactorEnabled,
      lockoutEnd: this.model.lockoutEnd,
      emailConfirmed: this.model.emailConfirmed,
    }
    await this.http.put(`api/Authentication/${this.id}`, data).subscribe(res => { this.toast.success("Profile Updated."), console.log(res); this.getAll(); })
  }
  public getImg = async (event) => {
    return this.result = event;
  }
}


