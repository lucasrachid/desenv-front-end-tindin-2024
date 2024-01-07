import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ClassesService } from '../../services/classes/classes.service';
import { VideoClass } from '../../model/video.classe';

@Component({
    selector: 'app-modal-class',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
    templateUrl: './modal-class.component.html',
    styleUrl: './modal-class.component.scss'
})
export class ModalClassComponent implements OnInit {
    loading = false;
    form!: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: MatDialog,
        private toastr: ToastrService,
        private classesService: ClassesService,
        public dialogRef: MatDialogRef<ModalClassComponent>
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = new FormGroup({
            className: new FormControl(''),
            classDescription: new FormControl(''),
            coverClass: new FormControl(''),
            urlVideoClass: new FormControl(''),
        });
    }

    submit(): void {
        this.loading = true;

        if (!this.form.valid) {
            this.toastr.error('', 'Preencha todos os campos');
            return;
        }

        const newClass: VideoClass = {
            title: this.form.value.className,
            cover: this.form.value.coverClass,
            video: this.form.value.urlVideoClass
        }

        this.classesService.createClass(newClass).subscribe({
            next: (result) => {
                this.toastr.success('', 'Aula criada com sucesso');
                this.dialogRef.close(result.class);
                this.loading = false;
            },
            error: (httpResponse) => {
                this.loading = false;
                this.toastr.error('', httpResponse.error.message);
                this.dialogRef.close();
            }
        });
    }

    close(): void {
        this.dialogRef.close();
    }
}
