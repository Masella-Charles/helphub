import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
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

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent, outlet: 'outlet1' },
  { path: 'login', component: LoginComponent, outlet: 'outlet1' },
  { path: 'home', component: HomeComponent, outlet: 'outlet1' },
  { path: 'opportunities', component: OpportunitiesComponent, outlet: 'outlet1' },
  { path: 'aboutus', component: AboutUsComponent, outlet: 'outlet1' },
  { path: 'contactus', component: ContactUsComponent, outlet: 'outlet1' },
  { path: 'profile', component: ProfileComponent, outlet: 'outlet1' },
  { path: 'testimonials', component: TestimonialsComponent, outlet: 'outlet1' },
  { path: 'cart', component: CartComponent, outlet: 'outlet1' },
  { path: 'history', component: HistoryComponent, outlet: 'outlet1' },
  { path: 'singleopportunity/:id', component: SingleOpportunityComponent, outlet: 'outlet1' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'opportunities-tracking', component: OpportunitiesTrackingComponent},
  { path: 'track-hours', component: TrackHoursComponent},
  { path: 'donor-management', component: DonorManagementComponent},
  { path: 'opportunities-posting', component: OpportunitiesPostingComponent},
  { path: 'admin-management', component: AdminManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
