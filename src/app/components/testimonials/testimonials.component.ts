import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit{

  loading: any;
  info: any;
  testimonial: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {
    this.getTestimonialByStatus();
    
  }
  getTestimonialByStatus() {
    this.loading = true;
    let endpoint = environment.endpoint.testimonials.get;
    const payload = {
      status: true
    };
    
    this.dataService.postWithPayload(endpoint,payload).subscribe(
      (response: any) => {
        this.loading = false;
        if(this.dataService.isValid(response)){
          if (response.length > 0) {
            this.testimonial = response;
            console.log('testimonial', this.testimonial);
              if (this.testimonial[0].testimonial) {
                // console.log('opportunity', opportunity);
              } else {
                this.info = "Fetch error, Try again later", "ERROR";
            };
          } else {
            this.info = "Record is empty";
          }
        }else{
          this.dataService.logout();
        }
        
      },
      error => {
        this.loading = false;
        this.info = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );
  }

  

}

