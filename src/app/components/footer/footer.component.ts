import {  Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  roleName: any;

  constructor() {
  
  }
  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.roleName = sessionStorage.getItem('roleName')
      
    }
  }

}
