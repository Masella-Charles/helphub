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
  selector: 'app-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrl: './testimonial-list.component.css'
})
export class TestimonialListComponent implements OnInit{
  displayedColumns: string[] = ['testimonial','user','userRole', 'status','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  loading: any;
  info: any;
  recordResponse: any;
  id: any;
  selectedRow: any;
  userId:  any;
  errorMessage:  any;
  testimonial: any;
  user: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {
    this.getRecordList();

    if (typeof sessionStorage !== 'undefined') {
      this.userId = sessionStorage.getItem('userId')

    }
    
  }

  getRecordList() {
    this.loading = true;
    const endpoint = environment.endpoint.testimonials.list;

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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase(); // Normalize the input

    // Define custom filter predicate
    const customFilter = (data: any, filter: string) => {
      // Define properties to filter on
      const filterProperties = ['testimonial','user','userRole', 'status','actions'];

      // Loop through each property and check if it matches the filter value
      for (const prop of filterProperties) {
        // Access nested properties using optional chaining (?.)
        if (data.user[prop]?.toString().toLowerCase().includes(filter)) {
          return true; // If match found, return true
        }
      }
      for (const prop of filterProperties) {
        // Access nested properties using optional chaining (?.)
        if (data[prop]?.toString().toLowerCase().includes(filter)) {
          return true; // If match found, return true
        }
      }
      return false; // If no match found, return false
    };

    // Set custom filter predicate to dataSource
    this.dataSource.filterPredicate = customFilter;

    // Apply filter
    this.dataSource.filter = filterValue;

    // Optionally, reset paginator to first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'block';
  }
  hidecreateRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'none';
  }


  createRecord() {
    this.loading = true;
    const payload = {
      testimonial: this.testimonial,
      userId: this.userId
    };
    let endpoint = environment.endpoint.testimonials.create;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Added Successfully", "SUCCESS")
          this.getRecordList();
          this.hidecreateRecordmodal();
          console.log('Record Added Successfully', response);
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

  updateRecordmodal() {
    var dom: any = document.getElementById('updateRecord');
    dom.style.display = 'block';
  }
  hideupdateRecordmodal() {
    var dom: any = document.getElementById('updateRecord');
    dom.style.display = 'none';
  }
  updateRecord() {
    this.loading = true;
    const payload = {
      id: this.id,
      testimonial: this.testimonial,
      userId: this.userId
    };
    let endpoint = environment.endpoint.testimonials.update;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Updated Successfully", "SUCCESS")
          this.getRecordList();
          this.hideupdateRecordmodal();
          console.log('Record Updated Successfully', response);
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
    let endpoint = environment.endpoint.testimonials.delete;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Deleted Successfully", "SUCCESS")
          this.getRecordList();
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
    let endpoint = environment.endpoint.testimonials.transition;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Approved Successfully", "SUCCESS")
          this.getRecordList();
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
    let endpoint = environment.endpoint.testimonials.transition;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Deactivated Successfully", "SUCCESS")
          this.getRecordList();
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

  edit(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id,
    this.testimonial = this.selectedRow.testimonial,
    this.user = this.selectedRow.user,
    this.userId = this.user.id
    console.log('Edit:', element);
  }

  delete(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id,
    this.testimonial = this.selectedRow.testimonial,
    this.user = this.selectedRow.user,
    this.userId = this.user.id
    console.log('Delete:', element);
  }

  approve(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id,
    this.testimonial = this.selectedRow.testimonial,
    this.user = this.selectedRow.user,
    this.userId = this.user.id
    console.log('Approve:', element);
  }

  deactivate(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id,
    this.testimonial = this.selectedRow.testimonial,
    this.user = this.selectedRow.user,
    this.userId = this.user.id
    console.log('Deactivate:', element);
  }


  

}
