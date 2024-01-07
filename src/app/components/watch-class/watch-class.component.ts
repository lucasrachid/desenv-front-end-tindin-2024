import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClassesService } from '../../services/classes/classes.service';
import { ModalClassComponent } from '../modal-class/modal-class.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { VideoClass } from '../../model/video.classe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-watch-class',
    standalone: true,
    imports: [ButtonModule, ToastModule, ProgressSpinnerModule],
    templateUrl: './watch-class.component.html',
    styleUrl: './watch-class.component.scss'
})
export class WatchClassComponent {
    videoClassModal!: VideoClass;
    loading = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: VideoClass,
        private toastr: ToastrService,
        private classesService: ClassesService,
        public dialogRef: MatDialogRef<ModalClassComponent>
    ) {
        this.validateClass(data);
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

    close(): void {
        this.dialogRef.close();
    }
}
