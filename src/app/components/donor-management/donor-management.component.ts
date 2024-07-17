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
  selector: 'app-donor-management',
  templateUrl: './donor-management.component.html',
  styleUrl: './donor-management.component.css'
})
export class DonorManagementComponent implements OnInit{
  displayedColumns: string[] = ['fullName','email','enabled','role','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  loading: any;
  info: any;
  recordResponse: any;
  showPassword: any;
  email: any;
  password: any;
  fullName: any;
  selectedRole: any;
  selectedRow: any;
  id: any;
  errorMessage: any;
  roleResponse: any;


  constructor(private dataService: DataService, private toastr:ToastrService, private router: Router){}


  ngOnInit(): void {
    this.getRecordList();
    
    
  }

  getRecordList() {
    this.loading = true;
    let payload ={
      roleName: 'PARTNER ADMIN'
    }
    const endpoint = environment.endpoint.users.byrole;

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
    this.getRoles();
  }
 
  hidecreateRecordmodal() {
    var dom: any = document.getElementById('createRecord');
    dom.style.display = 'none';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }



  createRecord() {
    this.loading = true;
    const payload = {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      role: 'PARTNER ADMIN'
    };
    let endpoint = environment.endpoint.users.signUp;
    console.log("payload",payload)
    console.log("selectedRole",this.selectedRole)
    this.dataService.postAuth(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.enabled == true) {
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
    this.getRoles();
  }
  hideupdateRecordmodal() {
    var dom: any = document.getElementById('updateRecord');
    dom.style.display = 'none';
  }
  updateRecord() {
    this.loading = true;
    const payload = {
      id: this.id,
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      role: this.selectedRole
    };
    let endpoint = environment.endpoint.users.editUser;
    this.dataService.updateAuth(endpoint, payload).subscribe(
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

  edit(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.email = this.selectedRow.email
    this.password = this.selectedRow.password
    this.fullName = this.selectedRow.fullName
    this.selectedRole = this.selectedRow.role.roleName
    console.log('Edit:', element);
  }

  delete(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.email = this.selectedRow.email
    this.password = this.selectedRow.password
    this.fullName = this.selectedRow.fullName
    this.selectedRole = this.selectedRow.selectedRole
    console.log('Delete:', element);
  }

  approve(element: any) {
    this.selectedRow = element;
    this.id = this.selectedRow.id
    this.email = this.selectedRow.email
    this.password = this.selectedRow.password
    this.fullName = this.selectedRow.fullName
    this.selectedRole = this.selectedRow.selectedRole
    console.log('Approve:', element);
  }

  getRoles() {
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
            this.roleResponse = response;
            console.log('role response:', this.roleResponse);
          } else {
            this.toastr.info("Role Record is empty","INFO")
          }
        } else {
          this.dataService.logout(); // Example method to handle invalid response
        }
      },
      error => {
        this.loading = false;
        this.toastr.error(`Role Fetch error: ${error.message || error.statusText || error}`, "ERROR")
        console.error('Fetch error:', error);
      }
    );
  }




}
