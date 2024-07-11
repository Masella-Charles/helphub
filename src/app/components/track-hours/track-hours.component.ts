import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-track-hours',
  templateUrl: './track-hours.component.html',
  styleUrl: './track-hours.component.css'
})
export class TrackHoursComponent implements OnInit{
  displayedColumns: string[] = ['fullName', 'opportunity','startTime', 'endTime', 'requiredVolunteers', 'hours', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  loading: any;
  info: any;
  opportunity: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {
    this.getTimeSheetList();
    
  }

  getTimeSheetList() {
    this.loading = true;
    let endpoint = environment.endpoint.timesheet.list;
    this.dataService.getWithoutPayload(endpoint).subscribe(
      (response: any) => {
        this.loading = false;
        if (this.dataService.isValid(response)) {
          if (response.length > 0) {
            this.opportunity = response;
            // Check if response is an array of opportunities or a single object
            const opportunities = response.map((item: any) => item.opportunityResponse);
            this.dataSource = new MatTableDataSource(opportunities);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 200);
            console.log('opportunity', this.opportunity);
            if (this.opportunity[0].opportunityResponse) {
              // console.log('opportunity', opportunity);
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
        this.info = `Fetch error: ${error}`;
        console.error('Fetch error', error);
      }
    );
  }

  getImageUrl(opportunityImages: any[]) {
    if (opportunityImages && opportunityImages.length > 0) {
      // Assuming there's only one image per opportunity; adjust if there can be multiple images
      const base64Image = opportunityImages[0].imageData;
      return `data:image/jpeg;base64,${base64Image}`;
    }
    return 'path/to/default/image.jpg'; // Fallback image if no image is present
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

