import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit{
  fullName: any;
  email: any;
  loading: any;
  message: any;

  constructor(private router: Router,  private dataService: DataService, private toastr: ToastrService){}



  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.fullName = sessionStorage.getItem('fullName')
      this.email = sessionStorage.getItem('email')
    }
  }

  contactus() {
    this.loading = true;
    const payload = {
      name: this.fullName,
      email: this.email,
      message: this.message,
    };
    let endpoint = environment.endpoint.contactus.create;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Your Message has been sent, our team will reach out to you.", "SUCCESS")
          console.log('Your Message has been sent', response);
          this.nullify();
        } else {
          this.toastr.error("An error occured, Try again later", "ERROR")
        }

      },
      error => {
        this.loading = false;
        console.error('An error occured.', error);
        this.toastr.error(`An error occured. ${error}`, "ERROR")
      }
    );
  }
  nullify(){
    this.message = ''
  }

}
