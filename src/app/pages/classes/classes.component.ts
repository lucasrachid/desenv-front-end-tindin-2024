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
import { ListVideoClasses } from '../../model/list.video.classes';
import { MatDialog } from '@angular/material/dialog';
import { ModalClassComponent } from '../../components/modal-class/modal-class.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { WatchClassComponent } from '../../components/watch-class/watch-class.component';


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
        ProgressBarModule,
        ProgressSpinnerModule
    ],
    templateUrl: './classes.component.html',
    styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {
    inputSearch = '';
    loading = false;
    videoClasses: VideoClass[] = [];
    cols = ['Aula', 'Ação']

    constructor(
        private authService: AuthenticationService,
        private classesService: ClassesService,
        private toastr: ToastrService,
        public dialog: MatDialog
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
        return this.videoClasses.filter(videoClass => videoClass !== undefined &&
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
        const dialogRef = this.dialog.open(ModalClassComponent);

        dialogRef.afterClosed().subscribe({
            next: (result) => {
                this.insertClassOnList(result);
            },
            error: (error) => {
                this.toastr.error('', 'Erro ao criar aula');
            }
        });
    }

    editClasse(data: VideoClass): void {
        const dialogRef = this.dialog.open(ModalClassComponent, {
            data: {
                class: data,
            },
        });

        dialogRef.afterClosed().subscribe({
            next: (result) => {
                this.updateClassOnList(result);
            },
            error: (error) => {
                this.toastr.error('', 'Erro ao criar aula');
            }
        });
    }

    deleteClasse(id: string): void {
        this.classesService.deleteClass(id).subscribe({
            next: () => {
                this.toastr.success('', 'Aula excluída com sucesso');
                this.removeVideoClass(id);
            }, error: (httpResponse) => {
                this.toastr.error('', httpResponse.error.message);
            }
        });
    }

    removeVideoClass(id: string): void {
        this.videoClasses = this.videoClasses.filter(videoClass => videoClass._id !== id);
    }

    insertClassOnList(data: VideoClass): void {
        this.videoClasses = [data, ...this.videoClasses];
    }

    updateClassOnList(data: VideoClass): void {
        this.videoClasses = this.videoClasses.map(videoClass => {
            if (videoClass._id === data._id) {
                return data;
            }
            return videoClass;
        });
    }

    watchViewClass(id: string): void {
        const dialogRef = this.dialog.open(WatchClassComponent, {
            disableClose: true,
            data: {
                _id: id,
            },
        });
    }

}
