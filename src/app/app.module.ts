import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BodyComponent } from './components/body/body.component';
import { SublevelMenuComponent } from './components/sidebar/sublevel-menu.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarhomeComponent } from './components/navbarhome/navbarhome.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SingleOpportunityComponent } from './components/single-opportunity/single-opportunity.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OpportunitiesTrackingComponent } from './components/opportunities-tracking/opportunities-tracking.component';
import { TrackHoursComponent } from './components/track-hours/track-hours.component';
import { DonorManagementComponent } from './components/donor-management/donor-management.component';
import { OpportunitiesPostingComponent } from './components/opportunities-posting/opportunities-posting.component';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { TestimonialListComponent } from './components/testimonial-list/testimonial-list.component';
import { DonationDistributionComponent } from './components/donation-distribution/donation-distribution.component';
import { DonationsComponent } from './components/donations/donations.component';
import { DisastersListComponent } from './components/disasters-list/disasters-list.component';
import { DisastersComponent } from './components/disasters/disasters.component';
import { RoleComponent } from './components/role/role.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BodyComponent,
    SublevelMenuComponent,
    HomeComponent,
    NavbarhomeComponent,
    FooterComponent,
    AboutUsComponent,
    OpportunitiesComponent,
    ContactUsComponent,
    SingleOpportunityComponent,
    DashboardComponent,
    OpportunitiesTrackingComponent,
    TrackHoursComponent,
    DonorManagementComponent,
    OpportunitiesPostingComponent,
    LoginComponent,
    AdminManagementComponent,
    ProfileComponent,
    TestimonialsComponent,
    CartComponent,
    HistoryComponent,
    ContactListComponent,
    TestimonialListComponent,
    DonationDistributionComponent,
    DonationsComponent,
    DisastersListComponent,
    DisastersComponent,
    RoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatStepperModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    CanvasJSAngularChartsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true, 
      progressBar: true, 
    }),
    BrowserAnimationsModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
