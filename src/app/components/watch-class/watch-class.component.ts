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
import { PerformanceObject } from '../../model/performance.object';

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
        // TODO -> Também deverá recuperar os dados do localStorage
        // E atualizar os indicadores da aula.
    }

    performanceCalculator(event: any): void {
        if (event.data == -1) {
            return;
        }

        const recoverPerformanceList = localStorage.getItem('performanceList');
        let performanceList: PerformanceObject[] = JSON.parse(recoverPerformanceList!);
        // Caso a lista seja null, criar uma e setar meu novo objeto de performance dentro dela
        if (!performanceList) {
            performanceList = [];
            const performanceObj = {
                id: this.data._id,
                currentTime: event.target.getCurrentTime(),
                watchedTime: event.target.getCurrentTime(),
                totalTimeVideo: event.target.getDuration(),
                performance: 0,
                progress: 0
            };
            performanceList.push(performanceObj);
            localStorage.setItem('performanceList', JSON.stringify(performanceList));
            return;
        }
        // Caso a lista não seja nulla, pode ter ou não o meu objeto de performance, logo
        // Tento buscar ele, se eu achar vou atualizá-lo, caso contrário, preciso criar
        let objToUpdate = performanceList.find(
            (performance: PerformanceObject) => performance.id === this.data._id
        );

        if (!objToUpdate) {
            objToUpdate = {
                id: this.data._id,
                currentTime: event.target.getCurrentTime(),
                watchedTime: 0,
                totalTimeVideo: event.target.getDuration(),
                performance: 0,
                progress: 0
            };
            performanceList.push(objToUpdate);
            localStorage.setItem('performanceList', JSON.stringify(performanceList));
            return;
        }

        // Caso o tempo atual do evento, seja maior que o tempo setado no local storage
        // devo calcular o tempo que retrocedeu e somar para o tempo que ele assistiu
        const currentTime = event.target.getCurrentTime();

        // Se o currentTime tiver uma diferenca de 1 segundo para o tempo total do video, considero que o usuário
        // finalizou ele, atualizando o progresso e gerando uma nota de performance
        const diffTime = objToUpdate.currentTime! - objToUpdate.totalTimeVideo!;
        if (diffTime <= 1) {
            objToUpdate.performance = this.validatePerformanceUser(
                objToUpdate.watchedTime!,
                objToUpdate.totalTimeVideo!
            );
            objToUpdate.progress = 100;
            const indicatorsToUpdate = {
                progress: objToUpdate.progress,
                performance: objToUpdate.performance
            }
            this.classesService.setClassIndicator(this.data._id!, indicatorsToUpdate).subscribe({
                next: (result) => {
                    this.videoClassModal = result.class!;
                },
                error: (httpResponse) => {
                    this.toastr.error('', httpResponse.error.message);
                    this.loading = false;
                }
            });
            return;
        }

        if (objToUpdate.currentTime! > currentTime) {
            const timeRetroceded = objToUpdate.currentTime! - currentTime;
            objToUpdate.watchedTime! += timeRetroceded;
        }
        // Caso o tempo atual do evento, seja menor que o tempo setado no local storage
        // também vou somar, porque foi a diferença de tempo que ele parou e voltou a assistir
        else {
            const sumTime = currentTime - objToUpdate.currentTime!;
            objToUpdate.watchedTime! += sumTime;
        }

        const progressUpdated = ((objToUpdate.watchedTime! / objToUpdate.totalTimeVideo!) * 100);

        objToUpdate = {
            ...objToUpdate,
            currentTime: event.target.getCurrentTime(),
            watchedTime: objToUpdate.watchedTime!,
            progress: progressUpdated
        }
        const performanceListUpdated = performanceList.map(obj => {
            if (obj.id === this.data._id) {
                return objToUpdate;
            }
            return obj;
        });
        localStorage.setItem('performanceList', JSON.stringify(performanceListUpdated));
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
        this.dialogRef.close(this.videoClassModal);
    }
}
