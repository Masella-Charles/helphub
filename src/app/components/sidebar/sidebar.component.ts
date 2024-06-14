import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { navbarData } from './nav-data';
import { INavbarData, fadeInOut } from './helper';

interface SideNavToogle {

  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ 'transform': 'rotate(0deg)', offset: '0' }),
            style({ 'transform': 'rotate(2turn)', offset: '1' }),
          ]))
      ])
    ])

  ]
})
export class SidebarComponent implements OnInit {


  @Output() onToggleSideNav: EventEmitter<SideNavToogle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0
  permission: any;
  username: any;
  partner: any;
  userId: any;
  navData = navbarData;
  multiple: boolean = false;
  access_token: any;
  refresh_token: any;
  userName: any;
  staffNo: any;
  email: any;
  phone: any;
  userPermissions: any;
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }

  }
  constructor(private router: Router) { }


  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    const additionalDataString = sessionStorage.getItem('additionalData');
    if (additionalDataString) {
      const additionalData = JSON.parse(additionalDataString);
      // Assign access_token, refresh_token, and user details to component variables
      this.access_token = additionalData.access_token;
      this.refresh_token = additionalData.refresh_token;
      // Set user details
      const user = additionalData.user;
      this.userName = user.userName;
      this.staffNo = user.staffNo;
      this.phone = user.phone;
      this.email = user.email;
      this.userPermissions = user.userPermissions;
    } else {
      // console.log('Additional data not found in sessionStorage');
    }
  }


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

  }
  handleClick(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }






}
