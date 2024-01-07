import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoClass } from '../../model/video.classe';
import { AuthenticationService } from '../authentication/authentication.service';
import { ListVideoClasses } from '../../model/list.video.classes';
import { RegisterClass } from '../../model/register.class';
import { IndicatorsUpdate } from '../../model/indicators.update';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    apiUrl = environment.apiUrl;
    pathClasses = 'classes';
    headers = new HttpHeaders();

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) { }

    getClasses(): Observable<ListVideoClasses> {
        const headers = this.authService.generateHeaders();
        return this.http.get<ListVideoClasses>(`${this.apiUrl}/${this.pathClasses}`, { headers });
    }

    getClass(id: string): Observable<any> {
        const headers = this.authService.generateHeaders();
        return this.http.get<any>(`${this.apiUrl}/classes/${id}`, { headers });
    }

    getClassIndicator(): Observable<RegisterClass> {
        const headers = this.authService.generateHeaders();
        return this.http.get<RegisterClass>(`${this.apiUrl}/${this.pathClasses}/indicators`, { headers });
    }

    setClassIndicator(id: string, objPerformance: IndicatorsUpdate): Observable<RegisterClass> {
        const headers = this.authService.generateHeaders();
        return this.http.post<RegisterClass>(
            `${this.apiUrl}/${this.pathClasses}/${id}/mine`, objPerformance, { headers }
        );
    }

    updateClass(data: VideoClass): Observable<RegisterClass> {
        const headers = this.authService.generateHeaders();
        return this.http.put<RegisterClass>(`${this.apiUrl}/${this.pathClasses}`, data, { headers });
    }

    createClass(data: VideoClass): Observable<RegisterClass> {
        const headers = this.authService.generateHeaders();
        return this.http.post<RegisterClass>(`${this.apiUrl}/${this.pathClasses}`, data, { headers });
    }

    deleteClass(id: string): Observable<VideoClass> {
        const headers = this.authService.generateHeaders();
        return this.http.delete<VideoClass>(`${this.apiUrl}/${this.pathClasses}/${id}`, { headers });
    }
}
