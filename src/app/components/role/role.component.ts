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
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  displayedColumns: string[] = ['roleName', 'roleDescription', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  loading: any;
  info: any;
  opportunity: any;
  recordResponse: any;
  roleName: any;
  roleDescription: any;
  selectedRow: any;
  id: any;
  errorMessage: any;


  constructor(private dataService: DataService, private toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
    this.getRecordList();

  }

  getRecordList() {
    this.loading = true;
    const endpoint = environment.endpoint.roles.list;

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
  }
  hidecreateRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'none';
  }


  createRecord() {
    this.loading = true;
    const payload = {
      roleName: this.roleName,
      roleDescription: this.roleDescription,
    };
    let endpoint = environment.endpoint.roles.create;
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
      roleName: this.roleName,
      roleDescription: this.roleDescription,
    };
    let endpoint = environment.endpoint.roles.update;
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
      roleName: this.roleName,
      roleDescription: this.roleDescription,
    };
    let endpoint = environment.endpoint.roles.delete;
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

  edit(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.roleName = this.selectedRow.roleName
    this.roleDescription = this.selectedRow.roleDescription
    console.log('Edit:', element);
  }

  delete(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.roleName = this.selectedRow.roleName
    this.roleDescription = this.selectedRow.roleDescription
    console.log('Delete:', element);
  }

  approve(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.roleName = this.selectedRow.roleName
    this.roleDescription = this.selectedRow.roleDescription
    console.log('Approve:', element);
  }




}
