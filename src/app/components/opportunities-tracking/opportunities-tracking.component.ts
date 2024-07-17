import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, delay, of } from 'rxjs';


@Component({
  selector: 'app-opportunities-tracking',
  templateUrl: './opportunities-tracking.component.html',
  styleUrl: './opportunities-tracking.component.css'
})
export class OpportunitiesTrackingComponent implements OnInit{
  displayedColumns: string[] = ['id', 'userName', 'userEmail', 'userSkills', 'opportunityName', 'opportunityDescription', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  loading: any;
  info: any;
  opportunity: any;
  errorMessage: any;
userName: any;
  id: any;
  selectedRow: any;
  userId: any;
  opportunityId: any;
  opportunityName: any;
  opportunitiesByUser: any;
  roleName: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {

    if (typeof window !== 'undefined') {
      this.userId = sessionStorage.getItem('userId')
      this.roleName = sessionStorage.getItem('roleName')
      console.log("role",this.roleName)
    }
    if (this.roleName === 'VOLUNTEER') {
      // Fetch opportunities by user ID
      this.getOpportunitiesByUserId();
    } else if (this.roleName === 'SYSTEM ADMIN') {
      // Fetch all opportunities
      this.getOpportunities();
    }
    
  }

  getOpportunities() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunityUser.list;
    
    this.dataService.getWithoutPayload(endpoint).pipe(
      catchError(error => {
        // Delay the error message display by 2 seconds
        return of(error).pipe(delay(2000));
      })
    ).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunity = response;
            console.log('opportunity', this.opportunity);
            this.dataSource = new MatTableDataSource(response);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 200);
          } else {
            this.info = "Record is empty";
          }
        } else {
          this.dataService.logout();
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = `Fetch error: ${error.message || error.statusText || error}`;
        console.error('Fetch error', error);
      }
    );
  }
  getOpportunitiesByUserId() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunityUser.get;
    const payload = {
      userId: this.userId,
      status: true
    };

    this.dataService.postWithPayload(endpoint,payload).pipe(
      catchError(error => {
        // Delay the error message display by 2 seconds
        return of(error).pipe(delay(2000));
      })
    ).subscribe(
      async (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunity = response;
            console.log('opportunity', this.opportunity);
            this.dataSource = new MatTableDataSource(response);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 200);
          } else {
            this.info = "Record is empty";
          }
        } else {
          this.dataService.logout();
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = `Fetch error: ${error.message || error.statusText || error}`;
        console.error('Fetch error', error);
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRecordmodal() {
    var dom: any = document.getElementById('deleteRecord');
    dom.style.display = 'block';
  }
  hidedeleteRecordmodal() {
    var dom: any = document.getElementById('deleteRecord');
    dom.style.display = 'none';
  }
  deleteRecord() {
    this.loading = true;
    const payload = {
      id: this.id,
    };
    let endpoint = environment.endpoint.opportunityUser.delete;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseCode === "200") {
          this.toastr.success("Record Deleted Successfully", "SUCCESS")
          this.getOpportunities();
          this.hidedeleteRecordmodal();
          console.log('Record Deleted Successfully', response);
        } else {
          this.toastr.error("An error occured, Try again later", "ERROR")
        }

      },
      error => {
        this.loading = false;
        console.error('An error occured.', error);
        this.toastr.error(`An error occured: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
  }



  approveRecordmodal() {
    var dom: any = document.getElementById('approveRecord');
    dom.style.display = 'block';
  }
  hideapproveRecordmodal() {
    var dom: any = document.getElementById('approveRecord');
    dom.style.display = 'none';
  }
  approveRecord(status:any) {
    this.loading = true;
    const payload = {
      id: this.id,
      status: status
    };
    let endpoint = environment.endpoint.opportunityUser.transition;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Approved Successfully", "SUCCESS")
          this.getOpportunities();
          this.hideapproveRecordmodal();
          console.log('Record Approved Successfully', response);
        } else {
          this.toastr.error("An error occured, Try again later", "ERROR")
        }

      },
      error => {
        this.loading = false;
        console.error('An error occured.', error);
        this.toastr.error(`An error occured: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
  }


  deactivateRecorddmodal() {
    var dom: any = document.getElementById('deactivateRecord');
    dom.style.display = 'block';
  }
  hidedeactivateRecordmodal() {
    var dom: any = document.getElementById('deactivateRecord');
    dom.style.display = 'none';
  }
  deactivateRecord(status:any) {
    this.loading = true;
    const payload = {
      id: this.id,
      status: status
    };
    let endpoint = environment.endpoint.opportunityUser.transition;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Deactivated Successfully", "SUCCESS")
          this.getOpportunities();
          this.hidedeactivateRecordmodal();
          console.log('Record Deactivated Successfully', response);
        } else {
          this.toastr.error("An error occured, Try again later", "ERROR")
        }

      },
      error => {
        this.loading = false;
        console.error('An error occured.', error);
        this.toastr.error(`An error occured: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
  }

  delete(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id,
    this.userId = this.selectedRow.userId
    this.userName = this.selectedRow.userName
    this.opportunityId = this.selectedRow.opportunityId
    this.opportunityName = this.selectedRow.opportunityName
    console.log('Delete:', element);
  }

  approve(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id,
    this.userId = this.selectedRow.userId
    this.userName = this.selectedRow.userName
    this.opportunityId = this.selectedRow.opportunityId
    this.opportunityName = this.selectedRow.opportunityName
    console.log('Approve:', element);
  }

  deactivate(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id,
    this.userId = this.selectedRow.userId
    this.userName = this.selectedRow.userName
    this.opportunityId = this.selectedRow.opportunityId
    this.opportunityName = this.selectedRow.opportunityName
    console.log('Deactivate:', element);
  }



  

}
