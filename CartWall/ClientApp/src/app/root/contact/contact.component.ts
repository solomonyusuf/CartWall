import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { BehaviorSubject } from 'rxjs';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { Contact } from '../../Models/contact';

@Component({
  selector: 'app-contact-component',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contact: Contact = {
    fullName: '',
    phoneNumber: '',
    email: '',
    message: '',
  }
  
  constructor(private http: HttpClient, private router: Router, private toast: ToastService) { }
  public async submit() {
    try {
      let data = {
        fullName: this.contact.fullName,
        phoneNumber: this.contact.phoneNumber,
        email: this.contact.email,
        message: this.contact.message,
      }
      await this.http.post(`api/Contact`, data).subscribe(async res => {
        await this.toast.success("You have sucessfully uploaded the form.");
        this.router.navigate(['/contact']);
       
      })
    } catch (e) {
      console.log(e);
    }
  }

}
