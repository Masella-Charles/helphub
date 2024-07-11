import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-opportunity',
  templateUrl: './single-opportunity.component.html',
  styleUrl: './single-opportunity.component.css'
})
export class SingleOpportunityComponent implements OnInit {
  opportunityId: any;
  loading: any;
  opportunity: any;
  info: any;
  opportunities: any;
  userId: any;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.opportunityId = params['id']; // Get opportunity ID from route params

      // Call method to fetch opportunity details based on ID
      this.getOpportunitiesById(this.opportunityId);
    });
    this.getOpportunitiesByStatus();

    if (typeof sessionStorage !== 'undefined') {
      this.userId = sessionStorage.getItem('userId')

    }
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
            this.opportunity = response;
            console.log('opportunity', this.opportunity);
            if (this.opportunity[0].opportunityResponse) {
              // console.log('opportunity', opportunity);
            } else {
              this.info = "Fetch error, Try again later", "ERROR";
            };
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

  getImageUrl(opportunityImages: any[]) {
    if (opportunityImages && opportunityImages.length > 0) {
      // Assuming there's only one image per opportunity; adjust if there can be multiple images
      const base64Image = opportunityImages[0].imageData;
      return `data:image/jpeg;base64,${base64Image}`;
    }
    return 'path/to/default/image.jpg'; // Fallback image if no image is present
  }

  getOpportunitiesByStatus() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunities.getByStatus;
    const payload = {
      status: true
    };

    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunities = response;
            console.log('opportunities', this.opportunities);
            if (this.opportunities[0].opportunityResponse) {
              // console.log('opportunity', opportunity);
            } else {
              this.info = "Fetch error, Try again later", "ERROR";
            };
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

  volunteerNow() {
    this.loading = true;
    const payload = {
      userId: this.userId,
      opportunityId: this.opportunityId,
    };
    let endpoint = environment.endpoint.opportunityUser.volunteerNow;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Added to cart successfully", "SUCCESS")
          this.router.navigate(['', { outlets: { outlet1: ['cart'] } }]);
          console.log('Added to cart successfully', response);
        } else if (response.additionalInfo.includes("com.volunteer.main.entity.VolunteerEntity.getSkills()")) {
          this.toastr.info("Add Skills to volunteer");
          this.router.navigate(['', { outlets: { outlet1: ['profile'] } }]);
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




}
