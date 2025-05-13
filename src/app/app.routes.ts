import { OverviewComponent } from './page/overview/overview.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component';
import { Routes } from '@angular/router';
import { DealerComponent } from './page/dealer/dealer.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { CustomerComponent } from './page/customer/customer.component';
import { SingleDealerComponent } from './page/single-dealer/single-dealer.component';
import { Login1Component } from './page/login-1/login-1.component';
import { ProfileComponent } from './page/profile/profile.component';
import { DealerResolver } from './service/dealar-resolver.service';
import { UsersComponent } from './page/users/users.component';
import { SingleEventComponent } from './page/single-event/single-event.component';
import { SingleLeadComponent } from './page/single-lead/single-lead.component';
import { LeadResolver } from './service/lead-resolver.service';
import { EventResolver } from './service/event-resolver.service';
import { UserResolver } from './service/user-resolver.service';
import { SingleUserComponent } from './page/single-user/single-user.component';
import { TaskResolver } from './service/task-resolver.service';
import { SingleTaskComponent } from './page/single-task/single-task.component';
import { SingleOppComponent } from './page/single-opp/single-opp.component';
import { OpportunitiesResolver } from './service/opportunities-resolver.service';
import { AuthGuard } from './component/guard/auth.guard';
import { RoleComponent } from './page/role/role.component';
import { DatatableComponent } from './page/datatable/datatable.component';
import { TeamComponent } from './page/team/team/team.component';
import { TargetComponent } from './page/target/target.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';

// export const routes: Routes = [
//   { path: '', component: Login1Component, pathMatch: 'full' },
//   { path: 'login', component: Login1Component },
//   {
//     path: 'Admin',
//     component: OverviewComponent,
//     // canActivate: [AuthGuard],
//     // canActivate: [AuthGuard], // Uncomment if AuthGuard is needed
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'overview', component: OverviewComponent },
//       {
//         path: 'dashboard',
//         component: DashboardComponent,
//         data: { title: 'Dashboard' },

//       },
//       { path: 'dealer', component: DealerComponent, data: { title: 'Dealer' } },

//       // { path: 'users', component: DealerComponent, data: { title: 'Dealer' } },
//       {
//         path: 'vehicle',
//         component: VehicleComponent,
//         data: { title: 'Vehicle' },
//       },
//       {
//         path: 'user-all',
//         component: UsersComponent,
//         data: { title: 'Users-All' },
//       },
//       {
//         path: 'customer',
//         component: CustomerComponent,
//         data: { title: 'Customer' },
//       },
//       {
//         path: 'user',
//         component: SingleDealerComponent,
//         data: { title: 'User' },
//       },
//       {
//         path: 'profile',
//         component: ProfileComponent,
//         data: { title: 'Profile' },
//       },
//       {
//         path: 'singleUser/:id',
//         component: SingleDealerComponent,
//         resolve: { dealerData: DealerResolver },
//         data: { title: 'Multiple' },
//       },
//       {
//         path: 'single-events/:eventId',
//         component: SingleEventComponent,
//         data: { title: 'Single events' },
//         resolve: { eventData:  EventResolver}

//       },
//       {
//         path: 'single-lead/:leadId',
//         component: SingleLeadComponent,
//         data: { title: 'Single Lead Data' },
//         resolve: { leadData:  LeadResolver}
//       },
//       {
//         path: 'single-user/:userId',
//         component: SingleUserComponent,
//         data: { title: 'Single user Data' },
//         resolve: { userData:  UserResolver}
//       },
//       {
//         path: 'single-task/:taskId',
//         component: SingleTaskComponent,
//         data: { title: 'Single Task Data' },
//         resolve: { taskData:  TaskResolver}
//       },
//       {
//         path: 'single-oppotunities/:oppId',
//         component: SingleOppComponent,
//         data: { title: 'Single Opportunities Data' },
//         resolve: { oppData:  OpportunitiesResolver}
//       },
//     ],
//   },
// ];

export const routes: Routes = [
  // remove this
  {
    path: 'dataTable',
    component: DatatableComponent,
    // canActivate: [AuthGuard],
  },
  { path: '', component: Login1Component, pathMatch: 'full' },
  { path: 'login', component: Login1Component },
  {
    path: 'Admin',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
        canActivate: [AuthGuard],
      },
      {
        path: 'dealer',
        component: DealerComponent,
        data: { title: 'Dealer' },
        canActivate: [AuthGuard],
      },
      {
        path: 'team',
        component: TeamComponent,
        data: { title: 'team' },
        canActivate: [AuthGuard],
      },
      {
        path: 'vehicle',
        component: VehicleComponent,
        data: { title: 'Vehicle' },
        canActivate: [AuthGuard],
      },
      {
        path: 'role',
        component: RoleComponent,
        data: { title: 'Role' },
        canActivate: [AuthGuard],
      },
      {
        path: 'user-all',
        component: UsersComponent,
        data: { title: 'Users-All' },
        canActivate: [AuthGuard],
      },
      {
        path: 'customer',
        component: CustomerComponent,
        data: { title: 'Customer' },
        canActivate: [AuthGuard],
      },
      {
        path: 'target',
        component: TargetComponent,
        data: { title: 'target' },
        canActivate: [AuthGuard],
      },

      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile' },
        canActivate: [AuthGuard],
      },

      {
        path: 'verify-email',
        component: VerifyEmailComponent,
        data: { title: 'Verify-email' },
        canActivate: [AuthGuard],
      },
      {
        path: 'singleUser/:dealer_id', // Ensure it matches exactly
        component: SingleDealerComponent,
        resolve: { dealerData: DealerResolver },
        data: { title: 'Multiple' },
        canActivate: [AuthGuard],
      },
      {
        path: 'single-events/:eventId',
        component: SingleEventComponent,
        resolve: { eventData: EventResolver },
        data: { title: 'Single events' },
        canActivate: [AuthGuard],
      },

      {
        // path: 'single-lead/:leadId',
        path: 'single-lead/:dealerId/:leadId',

        component: SingleLeadComponent,
        resolve: { leadData: LeadResolver },
        data: { title: 'Single Lead Data' },
        canActivate: [AuthGuard],
      },
      {
        path: 'single-user/:user_id',
        component: SingleUserComponent,
        resolve: { userData: UserResolver },
        // data: { title: 'Single user Data' },
        data: { title: 'Single user Data' },

        canActivate: [AuthGuard],
      },
      {
        path: 'single-task/:taskId',
        component: SingleTaskComponent,
        resolve: { taskData: TaskResolver },
        data: { title: 'Single Task Data' },
        canActivate: [AuthGuard],
      },
      {
        path: 'single-opportunities/:oppId',
        component: SingleOppComponent,
        resolve: { oppData: OpportunitiesResolver },
        data: { title: 'Single Opportunities Data' },
        canActivate: [AuthGuard],
      },
    ],
  },
];
