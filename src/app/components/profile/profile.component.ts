import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  fullName: any;
  roleName: any;
  email: any;

  
  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.fullName = sessionStorage.getItem('fullName')
      this.roleName = sessionStorage.getItem('roleName')
      this.email = sessionStorage.getItem('email')
      
    }
  }

}
