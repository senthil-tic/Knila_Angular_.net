import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'contacts', component: ContactListComponent,canActivate: [AuthGuard] },
    { path: 'add-contact', component: AddContactComponent,canActivate: [AuthGuard] },
    { path: 'edit-contact/:id', component: EditContactComponent,canActivate: [AuthGuard] },
];

