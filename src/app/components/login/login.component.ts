import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: any;
  password: any;
  email: any;
  fullName: any
  loading: any;
  showPassword: boolean = false;
  isLoggedIn: any;
  isSignUp: any;


  constructor(private toastr: ToastrService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {


  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  login() {
    this.loading = true;
    const payload = {
      email: this.email,
      password: this.password,
    };
    let endpoint = environment.endpoint.users.login;
    this.dataService.postAuth(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.token) {
          this.toastr.success("Login successful", "SUCCESS")
          sessionStorage.setItem('token', (response)['token']);
          this.getProfile();
          this.router.navigate(['', { outlets: { outlet1: ['home'] } }]);
          console.log('Login successful', response);
        } else {
          this.toastr.error("Login Error, Try again later", "ERROR")
        }
      },
      error => {
        this.loading = false;
        console.error('Login failed', error);
        this.toastr.error(`Login Error. ${error}`, "ERROR")
      }
    );
  }


  signup() {
    this.loading = true;
    const payload = {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      role: 'VOLUNTEER'
    };
    let endpoint = environment.endpoint.users.signUp;
    this.dataService.postAuth(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.enabled == true) {
          this.toastr.success("Signup successful", "SUCCESS")
          console.log('Signup successful', response);
          this.hideSignUpForm();
        } else {
          this.toastr.error("Signup Error, Try again later", "ERROR")
        }
      },
      error => {
        this.loading = false;
        console.error('Signup failed', error);
        this.toastr.error(`Signup Error. ${error}`, "ERROR")
      }
    );
  }


  showSignUpForm() {
    this.isSignUp = true;
    this.nullify();
  }
  hideSignUpForm() {
    this.isSignUp = false;
  }
  nullify() {
    this.username = '',
    this.password= '',
    this.email= '',
    this.fullName= ''
  }


  getProfile() {
    this.loading = true;
    let endpoint = environment.endpoint.users.profile;
    this.dataService.getWithoutPayload(endpoint).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.enabled == true) {
          console.log('Profile fetch successful', response);
          sessionStorage.setItem('email', (response)['email']);
          sessionStorage.setItem('fullName', (response)['fullName']);
          sessionStorage.setItem('userId', (response)['id']);
          sessionStorage.setItem('roleName', (response)['role']['roleName']);
        } else {
          this.toastr.error("Profile fetch error, Try again later", "ERROR")
          this.router.navigate(['']);
          sessionStorage.clear();
        }
      },
      error => {
        this.loading = false;
        console.error('Profile fetch error', error);
        this.toastr.error(`Profile fetch error. ${error}`, "ERROR");
        this.router.navigate(['']);
        sessionStorage.clear();
      }
    );
  }

}