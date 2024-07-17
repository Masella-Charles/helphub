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
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'message', 'stage','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  loading: any;
  info: any;
  opportunity: any;
  recordResponse: any;
  errorMessage: any;
  selectedRow: any;
  id: any;
  name: any;
  email: any;
  stage: any;
  message: any;
  contactUsRequestDTO: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {
    this.getRecordList();
    
  }

  getRecordList() {
    this.loading = true;
    const endpoint = environment.endpoint.contactus.list;

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
      const filterProperties = ['id', 'name', 'email', 'message', 'stage','actions'];

      // Loop through each property and check if it matches the filter value
      for (const prop of filterProperties) {
        // Access nested properties using optional chaining (?.)
        if (data.contactUsRequestDTO[prop]?.toString().toLowerCase().includes(filter)) {
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
      name: this.name,
      email: this.email,
      stage: this.stage,
      message: this.message,
    };
    let endpoint = environment.endpoint.contactus.update;
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
    let endpoint = environment.endpoint.contactus.delete;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseCode === "200") {
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


  edit(element: any) {
    this.selectedRow = element;
    this.contactUsRequestDTO = this.selectedRow.contactUsRequestDTO
    this.id = this.contactUsRequestDTO.id
    this.name= this.contactUsRequestDTO.name
    this.email= this.contactUsRequestDTO.email
    this.stage= this.contactUsRequestDTO.stage
    this.message= this.contactUsRequestDTO.message
    console.log('Edit:', element);
  }

  delete(element: any) {
    this.selectedRow = element;
    this.contactUsRequestDTO = this.selectedRow.contactUsRequestDTO
    this.id = this.contactUsRequestDTO.id
    this.name= this.contactUsRequestDTO.name
    this.email= this.contactUsRequestDTO.email
    this.stage= this.contactUsRequestDTO.stage
    this.message= this.contactUsRequestDTO.message
    console.log('Delete:', element);
  }
}
