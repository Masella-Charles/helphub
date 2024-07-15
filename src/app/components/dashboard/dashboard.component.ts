import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Opportunity, OpportunityUser } from '../../services/opportunity.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  opportunityUser = [];
  opportunity = [];
  @ViewChild('chart', { static: true })  chart!: ElementRef;
  loading: any;
  info: any;
  volunteerResponse: any;
  partnerResponse: any;
  opportunityinfo:  any;
  volunteerinfo:  any;
  partnerinfo:  any;
  opportunityUserList: any;
  opportunityList: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {
    this.getOpportunities();
    this.getVolunteerList();
    this.getPartnerList();
    this.getOpportunityUsers();
    
  }

  getOpportunities() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunities.list;
    this.dataService.getWithoutPayload(endpoint).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunityList = response;
            console.log('opportunityList', this.opportunityList);
          } else {
            this.opportunityinfo = "Record is empty";
          }
        } else {
          this.dataService.logout();
        }
      },
      error => {
        this.loading = false;
        this.opportunityinfo = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );
  }


  getVolunteerList() {
    this.loading = true;
    let payload ={
      roleName: 'VOLUNTEER'
    }
    let endpoint = environment.endpoint.users.byrole;
    this.dataService.postWithPayload(endpoint,payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.volunteerResponse = response;
            console.log('volunteerResponse', this.volunteerResponse);
          } else {
            this.volunteerinfo = "Record is empty";
          }
        } else {
          this.dataService.logout();
        }
      },
      error => {
        this.loading = false;
        this.volunteerinfo = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );
  }

  getPartnerList() {
    this.loading = true;
    let payload ={
      roleName: 'PARTNER ADMIN'
    }
    let endpoint = environment.endpoint.users.byrole;
    this.dataService.postWithPayload(endpoint,payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.partnerResponse = response;
            console.log('partnerResponse', this.partnerResponse);
          } else {
            this.partnerinfo = "Record is empty";
          }
        } else {
          this.dataService.logout();
        }
      },
      error => {
        this.loading = false;
        this.partnerinfo = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );
  }

  getOpportunityUsers() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunityUser.list;
    this.dataService.getWithoutPayload(endpoint).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunityUserList = response;
            console.log('opportunityUserList', this.opportunityUserList);
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

  
}
