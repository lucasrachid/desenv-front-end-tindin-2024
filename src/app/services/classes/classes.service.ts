import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoClass } from '../../model/video.classe';
import { AuthenticationService } from '../authentication/authentication.service';
import { ListVideoClasses } from '../../model/list.video.classes';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    apiUrl = environment.apiUrl;
    headers = new HttpHeaders();

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) { }

    getClasses(): Observable<ListVideoClasses> {
        const headers = this.authService.generateHeaders();
        return this.http.get<ListVideoClasses>(`${this.apiUrl}/classes`, { headers });
    }

    getClass(id: string): Observable<VideoClass> {
        const headers = this.authService.generateHeaders();
        return this.http.get<VideoClass>(`${this.apiUrl}/classes/${id}`, { headers });
    }

    getClassIndicator(): Observable<VideoClass> {
        const headers = this.authService.generateHeaders();
        return this.http.get<VideoClass>(`${this.apiUrl}/classes/indicators`, { headers });
    }

    updateClass(data: VideoClass): Observable<VideoClass> {
        const headers = this.authService.generateHeaders();
        return this.http.put<VideoClass>(`${this.apiUrl}/classes`, data, { headers });
    }

    createClass(data: VideoClass): Observable<VideoClass> {
        const headers = this.authService.generateHeaders();
        return this.http.post<VideoClass>(`${this.apiUrl}/classes`, data, { headers });
    }

    deleteClass(id: string): Observable<VideoClass> {
        const headers = this.authService.generateHeaders();
        return this.http.delete<VideoClass>(`${this.apiUrl}/classes/${id}`, { headers });
    }
}
