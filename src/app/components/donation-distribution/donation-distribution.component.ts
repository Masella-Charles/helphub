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
  selector: 'app-donation-distribution',
  templateUrl: './donation-distribution.component.html',
  styleUrl: './donation-distribution.component.css'
})
export class DonationDistributionComponent implements OnInit {
  displayedColumns: string[] = ['recipientName', 'amountDistributed', 'quantityDistributed', 'donorName', 'donationStatus', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loading: any;
  info: any;
  recordResponse: any;
  errorMessage: any;
  id: any;
  selectedRow: any;
  selectedDonation: any;
  recipientName: any;
  amountDistributed: any;
  quantityDistributed: any;
  donationStatus: any;
  donorName: any;
  donationResponse: any;
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
    const endpoint = environment.endpoint.donationDistribution.list;

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


  formatFullNumber(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    // Convert to a full number string with commas
    return value.toLocaleString('en-US', { maximumFractionDigits: 20 });
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
    this.getDonationList();
  }
  hidecreateRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'none';
  }


  createRecord() {
    this.loading = true;
    const payload = {
      donationId: this.selectedDonation,
      recipientName: this.recipientName,
      amountDistributed: this.amountDistributed,
      quantityDistributed: this.quantityDistributed
    };
    let endpoint = environment.endpoint.donationDistribution.create;
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
    this.getDonationList();
  }
  hideupdateRecordmodal() {
    var dom: any = document.getElementById('updateRecord');
    dom.style.display = 'none';
  }
  updateRecord() {
    this.loading = true;
    const payload = {
      id: this.id,
      donationId: this.selectedDonation,
      recipientName: this.recipientName,
      amountDistributed: this.amountDistributed,
      quantityDistributed: this.quantityDistributed,
      donationStatus: this.donationStatus
    };
    let endpoint = environment.endpoint.donationDistribution.update;
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
    let endpoint = environment.endpoint.donationDistribution.delete;
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



  edit(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.selectedDonation = this.selectedRow.donationId
    this.recipientName = this.selectedRow.recipientName
    this.amountDistributed = this.selectedRow.amountDistributed
    this.quantityDistributed = this.selectedRow.quantityDistributed
    this.donationStatus = this.selectedRow.donationStatus
    this.donorName = this.selectedRow.donorName
    this.recipientName = this.selectedRow.recipientName
    console.log('Edit:', element);
  }

  delete(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.selectedDonation = this.selectedRow.donationId
    this.recipientName = this.selectedRow.recipientName
    this.amountDistributed = this.selectedRow.amountDistributed
    this.quantityDistributed = this.selectedRow.quantityDistributed
    this.donationStatus = this.selectedRow.donationStatus
    this.donorName = this.selectedRow.donorName
    this.recipientName = this.selectedRow.recipientName
    console.log('Delete:', element);
  }




  getDonationList() {
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
            this.donationResponse = response;
            console.log('donation response:', this.donationResponse);
          } else {
            this.toastr.info("Record is empty", "INFO")
          }
        } else {
          this.dataService.logout(); // Example method to handle invalid response
        }
      },
      error => {
        this.loading = false;
        this.toastr.error(`Fetch error: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
  }




}
