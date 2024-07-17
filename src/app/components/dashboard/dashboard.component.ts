import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Opportunity, OpportunityUser } from '../../services/opportunity.interface';
import { CanvasJS } from '@canvasjs/angular-charts';
import { catchError, delay, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  opportunityUser: OpportunityUser[] = [];
  opportunity: Opportunity[] = [];

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
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    
    // Fetch opportunities
    let endpointOpportunities = environment.endpoint.opportunities.list;
    this.dataService.getWithoutPayload(endpointOpportunities).pipe(
      catchError(error => {
        // Delay the error message display by 2 seconds
        return of(error).pipe(delay(2000));
      })
    ).subscribe(
      (response: any) => {
        if (this.dataService.isValid(response)) {
          this.opportunityList = response;
          this.checkDataLoaded();
          console.log('opportunityList', this.opportunityList);
        } else {
          this.opportunityinfo = "Record is empty";
        }
      },
      error => {
        this.loading = false;
        this.opportunityinfo = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );

    // Fetch opportunity users
    let endpointOpportunityUsers = environment.endpoint.opportunityUser.list;
    this.dataService.getWithoutPayload(endpointOpportunityUsers).pipe(
      catchError(error => {
        // Delay the error message display by 2 seconds
        return of(error).pipe(delay(2000));
      })
    ).subscribe(
      (response: any) => {
        if (this.dataService.isValid(response)) {
          this.opportunityUserList = response;
          this.checkDataLoaded();
          console.log('opportunityUserList', this.opportunityUserList);
        } else {
          this.info = "Record is empty";
        }
      },
      error => {
        this.loading = false;
        this.info = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );

    // Fetch volunteer list
    let payloadVolunteer ={
      roleName: 'VOLUNTEER'
    }
    let endpointVolunteer = environment.endpoint.users.byrole;
    this.dataService.postWithPayload(endpointVolunteer,payloadVolunteer).pipe(
      catchError(error => {
        // Delay the error message display by 2 seconds
        return of(error).pipe(delay(2000));
      })
    ).subscribe(
      (response: any) => {
        if (this.dataService.isValid(response)) {
          this.volunteerResponse = response;
          this.checkDataLoaded();
          console.log('volunteerResponse', this.volunteerResponse);
        } else {
          this.volunteerinfo = "Record is empty";
        }
      },
      error => {
        this.loading = false;
        this.volunteerinfo = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );

    // Fetch partner list
    let payloadPartner ={
      roleName: 'PARTNER ADMIN'
    }
    let endpointPartner = environment.endpoint.users.byrole;
    this.dataService.postWithPayload(endpointPartner,payloadPartner).pipe(
      catchError(error => {
        // Delay the error message display by 2 seconds
        return of(error).pipe(delay(2000));
      })
    ).subscribe(
      (response: any) => {
        if (this.dataService.isValid(response)) {
          this.partnerResponse = response;
          console.log('partnerResponse', this.partnerResponse);
        } else {
          this.partnerinfo = "Record is empty";
        }
      },
      error => {
        this.loading = false;
        this.partnerinfo = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );
  }

  checkDataLoaded() {
    this.loading= true;
    // Check if all necessary data is loaded before updating the chart
    if (this.opportunityList && this.opportunityUserList) {
      this.loading= false;
      this.updateChart();
    }
  }

  updateChart() {
    
    if (this.opportunityList.length > 0 && this.opportunityUserList.length > 0) {
      const dataPoints = this.opportunityList.map((o: { opportunityResponse: { name: any; id: any; }; }) => ({
        label: o.opportunityResponse.name,
        y: this.opportunityUserList.filter((u: { opportunityId: any; }) => u.opportunityId === o.opportunityResponse.id).length
      }));
      
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: "Volunteers per Opportunity"
        },
        axisY: {
          title: "Number of Volunteers"
        },
        data: [{
          type: "column",
          dataPoints: dataPoints
        }]
      });
      
      chart.render();
      // this.loading= false;
    }
  }
  
}
