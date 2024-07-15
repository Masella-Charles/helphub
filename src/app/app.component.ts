import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


interface SideNavToogle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'helphub-portal';
  path = '';
  isSideNavCollapsed = false;
  screenWidth = 0;
  collapsed: any;

  constructor(
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
  }

  onToggleSidenav(data: SideNavToogle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;

  }

  validPaths: string[] = [
    '/dashboard',
    '/opportunities-tracking',
    '/track-hours',
    '/donor-management',
    '/opportunities-posting',
    '/admin-management',
    '/contact-list',
    '/testimonial-list',
    '/disasters-list',
    '/donations',
    '/donation-distribution',
    '/role',
  ];


  isSidebarPath(path: string): boolean {
    return this.validPaths.includes(path);
  }


}
