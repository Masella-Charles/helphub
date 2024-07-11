import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { catchError, map, of } from 'rxjs';

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
  opportunityUserId:any;


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
      async (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunities = response;
            console.log("opportunities", this.opportunities);
            // Iterate through each opportunity user to fetch opportunity details
            await Promise.all(this.opportunities.map(async (opportunityUser: { opportunityId: any; }, index: string | number) => {
              const opportunityDetails = await this.getOpportunitiesById(opportunityUser.opportunityId).toPromise();
              this.opportunities[index] = { ...opportunityUser, ...opportunityDetails };
            }));

            console.log("Updated opportunities with details", this.opportunities);
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
    let endpoint = environment.endpoint.opportunities.getById;
    const payload = {
      id: opportunityId
    };

    return this.dataService.postWithPayload(endpoint, payload).pipe(
      map((response: any) => {
        if (this.dataService.isValid(response)) {
          if (response?.length > 0) {
            let opportunity = response[0]; // Assuming response is an array, take the first element
            // Process the image URL
            opportunity.imageUrl = this.getImageUrl(opportunity.opportunityImages);
            return opportunity;
          }
        } else {
          this.dataService.logout();
        }
        return null;
      }),
      catchError(error => {
        console.error('Fetch error', error);
        return of(null);
      })
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



  delete(opportunityUserId:any) {
    this.loading = true;
    const payload = {
      id: opportunityUserId,
    };
    let endpoint = environment.endpoint.opportunityUser.delete;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseCode == "200") {
          this.toastr.success("Deleted successfully", "SUCCESS")
          console.log('Deleted successfully', response);
          this.getOpportunitiesByStatusAndUserId();
        } else {
          this.toastr.error("An error occured, Try again later", "ERROR")
        }
      },
      error => {
        this.loading = false;
        console.error('An error occured', error);
        this.toastr.error(`An error occured. ${error}`, "ERROR")
      }
    );
  }
  
}
