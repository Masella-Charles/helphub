import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, delay, of } from 'rxjs';

@Component({
  selector: 'app-track-hours',
  templateUrl: './track-hours.component.html',
  styleUrl: './track-hours.component.css'
})
export class TrackHoursComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'opportunityName', 'startTime', 'endTime', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loading: any;
  info: any;
  recordResponse: any;
  errorMessage: any;
  selectedRow: any;
  id: any;
  userResponse: any;
  opportunity: any;
  userId: any;
  selectedOpportunity: any;
  startTime: any;
  endTime: any;
  userName: any;
  opportunityName: any;
  status: any;
  roleName: any;


  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userId = sessionStorage.getItem('userId')
      this.roleName = sessionStorage.getItem('roleName')
    }
    if (this.roleName === 'VOLUNTEER') {
      // Fetch opportunities by user ID
      this.getTimesheetByUserId();
    } else if (this.roleName === 'SYSTEM ADMIN') {
      // Fetch all opportunities
      this.getRecordList();
    }

  }

  getRecordList() {
    this.loading = true;
    const endpoint = environment.endpoint.timesheet.list;

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
            this.recordResponse = response;
            console.log('Record response:', this.recordResponse);
            this.dataSource = new MatTableDataSource(this.recordResponse);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 200);
          } else {
            this.info = "Record is empty";
            console.log(this.info);
          }
        } else {
          this.dataService.logout(); // Example method to handle invalid response
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = `Fetch error: ${error.message || error.statusText || error}`;
        console.error('Fetch error:', error);
      }
    );
  }


  getTimesheetByUserId() {
    this.loading = true;
    const endpoint = environment.endpoint.timesheet.getByUserId;
    let payload = {
      userId: this.userId
    }

    this.dataService.postWithPayload(endpoint,payload).pipe(
      catchError(error => {
        // Delay the error message display by 2 seconds
        return of(error).pipe(delay(2000));
      })
    ).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.recordResponse = response;
            console.log('Record response:', this.recordResponse);
            this.dataSource = new MatTableDataSource(this.recordResponse);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 200);
          } else {
            this.info = "Record is empty";
            console.log(this.info);
          }
        } else {
          this.dataService.logout(); // Example method to handle invalid response
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = `Fetch error: ${error.message || error.statusText || error}`;
        console.error('Fetch error:', error);
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

  createRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'block';
    this.getOpportunitiesByUserIdAndStatus();
  }
  hidecreateRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'none';
  }


  createRecord() {
    this.loading = true;
    const payload = {
      userId: this.userId,
      opportunityId: this.selectedOpportunity,
      startTime: this.startTime,
      endTime: this.endTime
    };
    let endpoint = environment.endpoint.timesheet.create;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.toastr.success("Record Added Successfully", "SUCCESS")
        this.getRecordList();
        this.hidecreateRecordmodal();
        console.log('Record Added Successfully', response);
      },
      error => {
        this.loading = false;
        console.error('An error occured.', error);
        this.toastr.error(`An error occured: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
  }

  updateRecordmodal() {
    var dom: any = document.getElementById('updateRecord');
    dom.style.display = 'block';
    this.getOpportunitiesByUserIdAndStatus();
  }
  hideupdateRecordmodal() {
    var dom: any = document.getElementById('updateRecord');
    dom.style.display = 'none';
  }
  updateRecord() {
    this.loading = true;
    const payload = {
      id: this.id,
      userId: this.userId,
      opportunityId: this.selectedOpportunity,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status
    };
    let endpoint = environment.endpoint.timesheet.update;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.toastr.success("Record Updated Successfully", "SUCCESS")
        this.getRecordList();
        this.hideupdateRecordmodal();
        console.log('Record Updated Successfully', response);
      },
      error => {
        this.loading = false;
        console.error('An error occured.', error);
        this.toastr.error(`An error occured: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
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
    let endpoint = environment.endpoint.timesheet.delete;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.toastr.success("Record Deleted Successfully", "SUCCESS")
        this.getRecordList();
        this.hidedeleteRecordmodal();
        console.log('Record Deleted Successfully', response);
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
  approveRecord(status: any) {
    this.loading = true;
    const payload = {
      id: this.id,
      userId: this.userId,
      opportunityId: this.selectedOpportunity,
      startTime: this.startTime,
      endTime: this.endTime,
      status: status
    };
    let endpoint = environment.endpoint.timesheet.update;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.toastr.success("Record Approved Successfully", "SUCCESS")
        this.getRecordList();
        this.hideapproveRecordmodal();
        console.log('Record Approved Successfully', response);
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
  deactivateRecord(status: any) {
    this.loading = true;
    const payload = {
      id: this.id,
      userId: this.userId,
      opportunityId: this.selectedOpportunity,
      startTime: this.startTime,
      endTime: this.endTime,
      status: status
    };
    let endpoint = environment.endpoint.timesheet.update;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        this.toastr.success("Record Deactivated Successfully", "SUCCESS")
        this.getRecordList();
        this.hidedeactivateRecordmodal();
        console.log('Record Deactivated Successfully', response);
      },
      error => {
        this.loading = false;
        console.error('An error occured.', error);
        this.toastr.error(`An error occured: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
  }

  edit(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.userId = this.selectedRow.userId
    this.userName = this.selectedRow.userName
    this.selectedOpportunity = this.selectedRow.opportunityId
    this.opportunityName = this.selectedRow.opportunityName
    this.startTime = this.selectedRow.startTime
    this.endTime = this.selectedRow.endTime
    this.status = this.selectedRow.status
    console.log('Edit:', element);
  }

  delete(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.userId = this.selectedRow.userId
    this.userName = this.selectedRow.userName
    this.selectedOpportunity = this.selectedRow.opportunityId
    this.opportunityName = this.selectedRow.opportunityName
    this.startTime = this.selectedRow.startTime
    this.endTime = this.selectedRow.endTime
    this.status = this.selectedRow.status
    console.log('Delete:', element);
  }

  approve(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.userId = this.selectedRow.userId
    this.userName = this.selectedRow.userName
    this.selectedOpportunity = this.selectedRow.opportunityId
    this.opportunityName = this.selectedRow.opportunityName
    this.startTime = this.selectedRow.startTime
    this.endTime = this.selectedRow.endTime
    this.status = this.selectedRow.status
    console.log('Approve:', element);
  }

  deactivate(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.userId = this.selectedRow.userId
    this.userName = this.selectedRow.userName
    this.selectedOpportunity = this.selectedRow.opportunityId
    this.opportunityName = this.selectedRow.opportunityName
    this.startTime = this.selectedRow.startTime
    this.endTime = this.selectedRow.endTime
    this.status = this.selectedRow.status
    console.log('Deactivate:', element);
  }


  getOpportunitiesByUserIdAndStatus() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunityUser.get;
    const payload = {
      status: true,
      userId: this.userId
    };

    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunity = response;
            console.log('opportunity', this.opportunity);
          } else {
            this.toastr.info("Opportunity Record is empty", "INFO")
          }
        } else {
          this.dataService.logout();
        }

      },
      error => {
        this.loading = false;
        this.toastr.error(`Fetch error: ${error.message || error.statusText || error}`, "INFO")
        console.error('Fetch error', error);
      }
    );
  }







}

