import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, delay, of } from 'rxjs';


interface VolunteerOpportunity {
  id: number;
  name: string;
  description: string;
  date: string;
  requiredVolunteers: number;
  hours: number;
  status: boolean;
}

@Component({
  selector: 'app-opportunities-posting',
  templateUrl: './opportunities-posting.component.html',
  styleUrl: './opportunities-posting.component.css'
})
export class OpportunitiesPostingComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'description', 'date', 'requiredVolunteers', 'hours', 'status', 'actions'];
  dataSource!: MatTableDataSource<VolunteerOpportunity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loading: any;
  info: any;
  opportunity: any;
  id: any;
  selectedRow: any;
  errorMessage: any;
  name: any;
  description: any;
  requiredVolunteers: any;
  hours: any;
  fileName: any;
  imageData: any;
  selectedDisaster: any;
  disasterResponse: any;
  opportunityImages: any;
  imageUrl: any;


  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
    this.getOpportunities();

  }

  getOpportunities() {
    this.loading = true;
    let endpoint = environment.endpoint.opportunities.list;


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
            // Check if response is an array of opportunities or a single object
            const opportunities = response.map((item: any) => item.opportunityResponse);
            this.dataSource = new MatTableDataSource(opportunities);
            console.log('opportunities', opportunities);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 200);
            if (this.opportunity[0].opportunityResponse) {
              // 
            } else {
              this.info = "Fetch error, Try again later";
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

  createRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'block';
    this.getDisasterList();
  }
  hidecreateRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'none';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageData = e.target.result.split(',')[1]; // Extract base64 string
      };
      reader.readAsDataURL(file);
    }
  }


  createRecord() {
    this.loading = true;
    const payload = {
      name: this.name,
      description: this.description,
      requiredVolunteers: this.requiredVolunteers,
      hours: this.hours,
      disasterId: this.selectedDisaster,
      opportunityImages: [
        {
          fileName: this.fileName,
          imageData: this.imageData
        }
      ]
    };
    let endpoint = environment.endpoint.opportunities.create;
    console.log("payload", payload)
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Added Successfully", "SUCCESS")
          this.getOpportunities();
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
    this.getDisasterList();
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
      description: this.description,
      requiredVolunteers: this.requiredVolunteers,
      hours: this.hours,
      disasterId: this.selectedDisaster,
      opportunityImages: [
        {
          fileName: this.fileName,
          imageData: this.imageData
        }
      ]
    };
    let endpoint = environment.endpoint.opportunities.update;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.responseStatus.responseCode === "200") {
          this.toastr.success("Record Updated Successfully", "SUCCESS")
          this.getOpportunities();
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
      status: status
    };
    let endpoint = environment.endpoint.opportunities.transition;
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
  deactivateRecord(status: any) {
    this.loading = true;
    const payload = {
      id: this.id,
      status: status
    };
    let endpoint = environment.endpoint.opportunities.transition;
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

  edit(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.name = this.selectedRow.name
    this.description =this.selectedRow.description
    this.requiredVolunteers = this.selectedRow.requiredVolunteers
    this.hours = this.selectedRow.hours
    this.selectedDisaster = this.selectedRow.disasterId
    this.opportunityImages = this.selectedRow.opportunityImages
    this.fileName = this.opportunityImages[0].fileName
    this.imageData = this.opportunityImages[0].imageData
    this.imageUrl = `data:image/jpeg;base64,${this.imageData}`;
    console.log('Edit:', element);
  }

  delete(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.name = this.selectedRow.name
    this.description =this.selectedRow.description
    this.requiredVolunteers = this.selectedRow.requiredVolunteers
    this.hours = this.selectedRow.hours
    this.selectedDisaster = this.selectedRow.disasterId
    this.opportunityImages = this.selectedRow.opportunityImages
    this.fileName = this.opportunityImages[0].fileName
    this.imageData = this.opportunityImages[0].imageData
    this.imageUrl = `data:image/jpeg;base64,${this.imageData}`;
    console.log('Delete:', element);
  }

  approve(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.name = this.selectedRow.name
    this.description =this.selectedRow.description
    this.requiredVolunteers = this.selectedRow.requiredVolunteers
    this.hours = this.selectedRow.hours
    this.selectedDisaster = this.selectedRow.disasterId
    this.opportunityImages = this.selectedRow.opportunityImages
    this.fileName = this.opportunityImages[0].fileName
    this.imageData = this.opportunityImages[0].imageData
    this.imageUrl = `data:image/jpeg;base64,${this.imageData}`;
    console.log('Approve:', element);
  }

  deactivate(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.name = this.selectedRow.name
    this.description =this.selectedRow.description
    this.requiredVolunteers = this.selectedRow.requiredVolunteers
    this.hours = this.selectedRow.hours
    this.selectedDisaster = this.selectedRow.disasterId
    this.opportunityImages = this.selectedRow.opportunityImages
    this.fileName = this.opportunityImages[0].fileName
    this.imageData = this.opportunityImages[0].imageData
    this.imageUrl = `data:image/jpeg;base64,${this.imageData}`;
    console.log('Deactivate:', element);
  }


  getDisasterList() {
    this.loading = true;
    let endpoint = environment.endpoint.disasters.list;
    this.dataService.getWithoutPayload(endpoint).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.disasterResponse = response;
            console.log('disasterResponse', this.disasterResponse);
          } else {
            this.toastr.info("Record is empty", "INFO")
          }
        } else {
          this.dataService.logout();
        }
      },
      error => {
        this.loading = false;
        this.toastr.error(`Fetch error: ${error.message || error.statusText || error}`, "ERROR")
        console.error('Fetch error', error);
      }
    );
  }







}
