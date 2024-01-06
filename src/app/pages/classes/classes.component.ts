import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { VideoClass } from '../../model/video.classe';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { StringUtil } from '../../utils/string.utils';
import { ProgressBarModule } from 'primeng/progressbar';
import { ClassesService } from '../../services/classes/classes.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { ListVideoClasses } from '../../model/list.video.classes';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
    selector: 'app-classes',
    standalone: true,
    imports: [
        ButtonModule,
        InputTextModule,
        FormsModule,
        TableModule,
        RatingModule,
        MenuModule,
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        ProgressBarModule
    ],
    templateUrl: './classes.component.html',
    styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {
    inputSearch = '';
    loading = false;
    loadingAction = false;
    videoClasses: VideoClass[] = [];
    cols = ['Aula', 'Ação']

    constructor(
        private authService: AuthenticationService,
        private classesService: ClassesService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.searchClassList();
    }

    logoutUser(): void {
        this.authService.logout();
    }

    searchClassList(): void {
        this.loading = true;
        this.classesService.getClasses().subscribe({
            next: (response: ListVideoClasses) => {
                if (response && response.classes) {
                    this.videoClasses = this.videoClasses.concat(response.classes);
                }
                this.loading = false;
            }, error: (httpResponse) => {
                this.toastr.error('', httpResponse.error.message);
                this.loading = false;
            }
        })

    }

    filterList(): VideoClass[] {
        return this.videoClasses.filter(videoClass =>
            videoClass.title!.toLowerCase().includes(this.inputSearch.toLowerCase())
        );
    }

    getTitleVideo(title: string): string {
        return StringUtil.capitalizeFirstLetterOfWords(title);
    }

    convertPerformance(value: number): number {
        const maxValue = Math.min(Math.max(value, 0), 100);
        const convertedValue = (maxValue / 100) * 5.0;
        return parseFloat(convertedValue.toFixed(1));
    }

    newClass(): void {

    }

    editClasse(data: VideoClass): void {
        console.log(data);
    }

    viewClasse(data: VideoClass): void {
        console.log(data);
    }

    deleteClasse(id: string): void {
        this.loadingAction = true;
        this.classesService.deleteClass(id).subscribe({
            next: () => {
                this.toastr.success('', 'Aula excluída com sucesso');
                this.removeVideoClass(id);
                this.loadingAction = false;
            }, error: (httpResponse) => {
                this.toastr.error('', httpResponse.error.message);
                this.loadingAction = true;
            }
        });
    }

    removeVideoClass(id: string): void {
        this.videoClasses = this.videoClasses.filter(videoClass => videoClass._id !== id);
    }

}
