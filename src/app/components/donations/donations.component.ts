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
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent implements OnInit {
  displayedColumns: string[] = ['donorName', 'type', 'amount', 'commodityName', 'quantity', 'disasterEntity', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loading: any;
  info: any;
  recordResponse: any;
  id: any;
  selectedRow: any;
  errorMessage: any;
  selectedDisaster: any;
  commodityName: any;
  quantity: any;
  amount: any;
  type: any;
  donorName: any;
  disasterResponse: any;
  status: any;
  roleName: any;


  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
    this.getRecordList();
    if (typeof window !== 'undefined') {
      this.roleName = sessionStorage.getItem('roleName')
    }

  }

  getRecordList() {
    this.loading = true;
    const endpoint = environment.endpoint.donations.list;

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


  createRecord() {
    this.loading = true;
    const payload = {
      donorName: this.donorName,
      type: this.type,
      amount: this.amount,
      commodityName: this.commodityName,
      quantity: this.quantity,
      disasterId: this.selectedDisaster
    };
    let endpoint = environment.endpoint.donations.create;
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
      donorName: this.donorName,
      type: this.type,
      amount: this.amount,
      commodityName: this.commodityName,
      quantity: this.quantity,
      disasterId: this.selectedDisaster
    };
    let endpoint = environment.endpoint.donations.update;
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
    let endpoint = environment.endpoint.donations.transition;
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
  deactivateRecord(status: any) {
    this.loading = true;
    const payload = {
      id: this.id,
      status: status
    };
    let endpoint = environment.endpoint.donations.transition;
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
    this.id = this.selectedRow.id
    this.donorName = this.selectedRow.donorName
    this.type = this.selectedRow.type
    this.amount = this.selectedRow.amount
    this.commodityName = this.selectedRow.commodityName
    this.quantity = this.selectedRow.quantity
    this.status = this.selectedRow.status
    if (this.selectedRow.disasterEntity !== null) {
      this.selectedDisaster = this.selectedRow.disasterEntity.id
    } else {
      this.selectedDisaster = null
    }
    console.log('Edit:', element);
  }

  approve(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.donorName = this.selectedRow.donorName
    this.type = this.selectedRow.type
    this.amount = this.selectedRow.amount
    this.commodityName = this.selectedRow.commodityName
    this.quantity = this.selectedRow.quantity
    this.status = this.selectedRow.status
    if (this.selectedRow.disasterEntity !== null) {
      this.selectedDisaster = this.selectedRow.disasterEntity.id
    } else {
      this.selectedDisaster = null
    }
    console.log('Approve:', element);
  }

  deactivate(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.donorName = this.selectedRow.donorName
    this.type = this.selectedRow.type
    this.amount = this.selectedRow.amount
    this.commodityName = this.selectedRow.commodityName
    this.quantity = this.selectedRow.quantity
    this.status = this.selectedRow.status
    if (this.selectedRow.disasterEntity !== null) {
      this.selectedDisaster = this.selectedRow.disasterEntity.id
    } else {
      this.selectedDisaster = null
    }
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
