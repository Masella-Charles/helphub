import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbarhome',
  templateUrl: './navbarhome.component.html',
  styleUrls: ['./navbarhome.component.css']
})
export class NavbarhomeComponent implements OnInit {
  

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute,private cdr: ChangeDetectorRef) {
  
  }

  ngOnInit(): void {
  }

  

}
