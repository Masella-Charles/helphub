import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-donation-distribution',
  templateUrl: './donation-distribution.component.html',
  styleUrl: './donation-distribution.component.css'
})
export class DonationDistributionComponent implements OnInit {
  displayedColumns: string[] = ['recipientName', 'amountDistributed', 'quantityDistributed', 'donorName','donationStatus','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loading: any;
  info: any;
  recordResponse: any;


  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
    this.getRecordList();

  }

  getRecordList() {
    this.loading = true;
    let endpoint = environment.endpoint.donationDistribution.list;
    this.dataService.getWithoutPayload(endpoint).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.recordResponse = response;
            console.log('recordResponse', this.recordResponse);
            this.dataSource = new MatTableDataSource(this.recordResponse);
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
        this.info = `Fetch error: ${error}`;
        console.error('Fetch error', error);
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

  edit(element: any) {
    console.log('Edit:', element);
    // Implement edit logic here
  }

  delete(element: any) {
    console.log('Delete:', element);
    // Implement delete logic here
  }

  approve(element: any) {
    console.log('Approve:', element);
    // Implement approve logic here
  }


}
