import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  fullName: any;
  roleName: any;
  email: any;
  loading: any;
  opportunityUserId: any;
  profileForm: any;
  skillInput: any;
  phone: any;
  userId: any;
  volunteer: any;
  info: any;
  volunteerId: any;
  profileEditForm:any;
  editPassword: any;
  password: any;
  showPassword:any;


  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService,private toastr:ToastrService){}

  
  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.fullName = sessionStorage.getItem('fullName')
      this.roleName = sessionStorage.getItem('roleName')
      this.email = sessionStorage.getItem('email')
      this.userId = sessionStorage.getItem('userId')
      console.log(this.fullName)
    }
    this.getVolunteerById();
  }

  showProfileForm() {
    this.profileForm = true;
  }
  hideProfileForm() {
    this.profileForm = false;
  }

  createVolunteer() {
    this.loading = true;
    const skillsArray = this.skillInput.split(',').map((skill: string) => skill.trim());
  
    const payload = {
      phone: this.phone,
      email: this.email,
      additionalInfo: 'Volunteer',
      userId: this.userId,
      skills: skillsArray,
    };
    let endpoint = environment.endpoint.volunteer.create;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (volunteerResponse: any) => {
        this.loading = false;
        if (volunteerResponse.responseStatus.responseCode == "200") {
          this.toastr.success("Successfully Added To Profile", "SUCCESS")
          console.log('Volunteer created successfully', volunteerResponse);
          this.hideProfileForm();
          this.getVolunteerById();
        } else {
          this.toastr.error("Profile creation failed, try again later", "ERROR")
        }
      },
      error => {
        this.loading = false;
        console.error('Profile creation failed', error);
        this.toastr.error(`Profile creation failed. ${error}`, "ERROR")
      }
    );
  }


  showEditProfileForm() {
    this.profileEditForm = true;
  }
  hideEditProfileForm() {
    this.profileEditForm = false;
  }


  updateVolunteer() {
    this.loading = true;
    const skillsArray = this.skillInput.split(',').map((skill: string) => skill.trim());
  
    const payload = {
      id: this.volunteerId,
      phone: this.phone,
      email: this.email,
      additionalInfo: 'Volunteer',
      userId: this.userId,
      skills: skillsArray,
    };
    let endpoint = environment.endpoint.volunteer.update;
    this.dataService.postWithPayload(endpoint, payload).subscribe(
      (volunteerResponse: any) => {
        this.loading = false;
        if (volunteerResponse.responseStatus.responseCode == "200") {
          this.toastr.success("Successfully Updated To Profile", "SUCCESS")
          console.log('Volunteer updated successfully', volunteerResponse);
          this.hideEditProfileForm();
          this.getVolunteerById();
        } else {
          this.toastr.error("Profile update failed, try again later", "ERROR")
        }
      },
      error => {
        this.loading = false;
        console.error('Profile update failed', error);
        this.toastr.error(`Profile update failed. ${error}`, "ERROR")
      }
    );
  }

  getVolunteerById() {
    this.loading = true;
    let endpoint = environment.endpoint.volunteer.getByUserId;
    const payload = {
      userId: this.userId
    };
    
    this.dataService.postWithPayload(endpoint,payload).subscribe(
      (response: any) => {
        this.loading = false;
        if(this.dataService.isValid(response)){
          if (response.user) {
            this.volunteer = response;
            this.volunteerId = response.id;
            this.phone = response.phone;
            this.skillInput = response.skills;
            console.log('vounteer', this.volunteer);
              if (this.volunteer) {
                // console.log('opportunity', opportunity);
              } else {
                this.info = "Fetch error, Try again later", "ERROR";
              };
          } else {
            this.info = "Record is empty";
          }
        }else{
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


  delete() {
    this.loading = true;
    const payload = {
      id: this.opportunityUserId
    };
    let endpoint = environment.endpoint.opportunityUser.delete;
    this.dataService.postAuth(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.enabled == true) {
          this.toastr.success("Deleted successfully", "SUCCESS")
          console.log('Deleted successfully', response);
        } else {
          this.toastr.error("An error occured, Try again later", "ERROR")
        }
      },
      error => {
        this.loading = false;
        console.error('An error occured', error);
        this.toastr.error(`An error occured. ${error}`, "ERROR")
      }
    );
  }

  showEditPasswordForm() {
    this.editPassword = true;
  }
  hideEditPasswordForm() {
    this.editPassword = false;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }



  editPass() {
    this.loading = true;
    const payload = {
      email: this.email,
      password: this.password,
    };
    let endpoint = environment.endpoint.users.editPassword;
    this.dataService.updateAuth(endpoint, payload).subscribe(
      (response: any) => {
        this.loading = false;
          this.toastr.success("Password update successful", "SUCCESS")
          console.log('Password update successful', response);
          this.hideEditPasswordForm();
          this.logout();
      },
      error => {
        this.loading = false;
        console.error('Password update failed', error);
        this.toastr.error(`An error occured: ${error.message || error.statusText || error}`, "ERROR")
      }
    );
  }

  logout() {
    this.dataService.logout();
    // this.toastr.success("Logout Successfull", "SUCCESS");
  }

}
