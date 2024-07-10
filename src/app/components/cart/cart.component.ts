import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  loading: any;
  opportunities: any;
  info: any;
  userId: any;
  opportunity: any;
  opportunityImages: any;


  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService,private toastr:ToastrService){}
  ngOnInit(): void {

    if (typeof sessionStorage !== 'undefined') {
      this.userId = sessionStorage.getItem('userId')
      
    }

    this.getOpportunitiesByStatusAndUserId();
    
  }


  getOpportunitiesByStatusAndUserId() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunityUser.get;
    const payload = {
      userId: this.userId,
      status: false,
    };
    
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunities = response;
            // Iterate through each opportunity user to fetch opportunity details
            for (let opportunityUser of this.opportunities) {
              this.getOpportunitiesById(opportunityUser.opportunityId);
            }
          } else {
            this.info = "Record is empty";
          }
        } else {
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
  
  getOpportunitiesById(opportunityId: any) {
    this.loading = true;
    let endpoint = environment.endpoint.opportunities.getById;
    const payload = {
      id: opportunityId
    };
    
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            // Assuming response is an array of opportunities, handle accordingly
            this.opportunity = response[0]; // Assuming response is an array, take the first element
            console.log('opportunity', this.opportunity);
            this.info = "Record is empty";
          }
        } else {
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
  
  getImageUrl(opportunityImages: any[]) {
    if (opportunityImages && opportunityImages.length > 0) {
      // Assuming there's only one image per opportunity; adjust if there can be multiple images
      const base64Image = opportunityImages[0].imageData;
      return `data:image/jpeg;base64,${base64Image}`;
    }
    return 'path/to/default/image.jpg'; // Fallback image if no image is present
  }

  
}
