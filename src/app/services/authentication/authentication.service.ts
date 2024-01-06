import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { environment } from '../../../environments/environment.development';
import { Auth } from '../../model/auth.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    apiUrl = environment.apiUrl;
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasAuthToken());
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signUp(user: User): Observable<User> {
        return this.http.post(`${environment.apiUrl}/users`, user);
    }

    login(user: User): Observable<Auth> {
        this.isAuthenticatedSubject.next(true);
        return this.http.post(`${environment.apiUrl}/auth`, user);
    }

    logout(): void {
        this.isAuthenticatedSubject.next(false);
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
    }

    hasAuthToken(): boolean {
        return !!localStorage.getItem('authToken');
    }

    recoverToken(): string {
        return localStorage.getItem('authToken') || '';
    }

    generateHeaders(): HttpHeaders {
        const authToken = this.recoverToken();
        if (authToken == '') {
            return new HttpHeaders();
        }
        const userToken = JSON.parse(authToken);
        return new HttpHeaders({
            'x-api-key': userToken.token
        });
    }
}
