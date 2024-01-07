import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassesService } from '../../services/classes/classes.service';
import { ModalClassComponent } from '../modal-class/modal-class.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { VideoClass } from '../../model/video.classe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
    selector: 'app-watch-class',
    standalone: true,
    imports: [ButtonModule, ToastModule, ProgressSpinnerModule, YouTubePlayerModule],
    templateUrl: './watch-class.component.html',
    styleUrl: './watch-class.component.scss'
})
export class WatchClassComponent implements OnInit {
    videoClassModal!: VideoClass;
    loading = false;
    apiLoaded = false;
    videoId = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: VideoClass,
        private toastr: ToastrService,
        private classesService: ClassesService,
        public dialogRef: MatDialogRef<ModalClassComponent>
    ) {
        this.validateClass(data);
    }

    ngOnInit(): void {
        this.initializePlayer();
    }

    initializePlayer(): void {
        if (!this.apiLoaded) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
            this.apiLoaded = true;
        }
    }

    validateClass(data: VideoClass): void {
        if (!data) {
            this.toastr.error('',
                'Ocorreu um erro, tente novamente. Caso o erro persista, entre em contato com o suporte.'
            );
            this.dialogRef.close();
            return;
        }

        this.loading = true;
        this.classesService.getClass(data._id!).subscribe({
            next: (videoClass) => {
                if (!videoClass || !videoClass.class) {
                    this.toastr.error('',
                        'Ocorreu um erro, tente novamente. Caso o erro persista, entre em contato com o suporte.'
                    );
                    this.dialogRef.close();
                    return;
                }
                this.videoClassModal = videoClass.class;
                this.videoId = this.getYoutubeVideoId(this.videoClassModal.video!);
                this.loading = false;
                return;
            },
            error: (httpResponse) => {
                this.toastr.error('', httpResponse.error.message);
                this.loading = false;
            }
        });

    }

    completeClass(): void {

    }

    testClass(event: any): void {
        console.log(event);
        console.log(event.target.getCurrentTime());
    }

    validatePerformanceUser(watchedTime: number, videoTime: number): number {
        const performance = ((videoTime - watchedTime) / videoTime) * 100;
        return Math.max(0, Math.min(100, performance));
    }

    getYoutubeVideoId(url: string): string {
        if (!url) {
            this.toastr.error('', 'Ocorreu um erro, tente novamente');
            return '';
        }
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w\-]{11})/);
        return match ? match[1] : '';
    }

    close(): void {
        this.dialogRef.close();
    }
}
