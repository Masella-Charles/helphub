import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SingleOpportunityComponent } from './components/single-opportunity/single-opportunity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, outlet: 'outlet1' },
  { path: 'home', component: HomeComponent, outlet: 'outlet1' },
  { path: 'opportunities', component: OpportunitiesComponent, outlet: 'outlet1' },
  { path: 'aboutus', component: AboutUsComponent, outlet: 'outlet1' },
  { path: 'contactus', component: ContactUsComponent, outlet: 'outlet1' },
  { path: 'singleopportunity', component: SingleOpportunityComponent, outlet: 'outlet1' },
  // { path: 'event/:id', component: EventComponent, outlet: 'outlet1' },
  // { path: 'category/:id', component: CategoryComponent, outlet: 'outlet1' },
  // { path: 'search/:eventName', component: SearchComponent, outlet: 'outlet1' },
  // { path: 'cart', component: CartComponent, outlet: 'outlet1', canActivate: [AuthGuard], },
  // { path: 'payment/:id', component: PaymentComponent, outlet: 'outlet1' },
  // { path: 'ticket/:id', component: TicketComponent, outlet: 'outlet1' },
  // { path: 'orders', component: OrdersComponent, outlet: 'outlet1', canActivate: [AuthGuard], },
  // { path: 'personal', component: PersonalComponent, outlet: 'outlet1', canActivate: [AuthGuard], },

  // { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],  },
  // { path: 'events', component: EventsComponent, canActivate: [AuthGuard], },
  // { path: 'users', component: UsersComponent,canActivate: [AuthGuard],  },
  // { path: 'partners', component: PartnersComponent,canActivate: [AuthGuard],  },
  // { path: 'organization', component: OrganizationComponent,canActivate: [AuthGuard],  },
  // { path: 'reports', component: ReportsComponent,canActivate: [AuthGuard],  },
  // {
  //   path: 'products',
  //   loadChildren: () => import('./components/product-setup/product-setup.module').then(m => m.ProductSetupModule)
  //   , canActivate: [AuthGuard]
  // },
  // {
  //   path: 'partners',
  //   loadChildren: () => import('./components/partner-setup/partner-setup.module').then(m => m.PartnerSetupModule)
  //   , canActivate: [AuthGuard]
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
  //   , canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
