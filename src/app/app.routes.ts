import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { AuthGuard } from './auth-guard/auth.guard';

export const routes: Routes = [
    { path: 'auth', component: AuthenticationComponent },
    { path: 'login', component: AuthenticationComponent },
    { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard] },
    { path: '', component: AuthenticationComponent },
    { path: '**', component: PageNotFoundComponent }
];
