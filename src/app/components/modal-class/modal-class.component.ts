import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ClassesService } from '../../services/classes/classes.service';
import { VideoClass } from '../../model/video.classe';
import { RegisterClass } from '../../model/register.class';

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
    videoClassModal?: VideoClass;
    editing = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: RegisterClass,
        private toastr: ToastrService,
        private classesService: ClassesService,
        public dialogRef: MatDialogRef<ModalClassComponent>
    ) {
        this.verifyVideoClass(data);
    }

    ngOnInit(): void {
        this.manageForm();
    }

    verifyVideoClass(data: RegisterClass): void {
        if (!data) {
            return;
        }
        this.editing = true;
        this.videoClassModal = data.class;
    }

    manageForm(): void {
        const formControls: { [key: string]: string } = {
            'className': this.videoClassModal?.title || '',
            'classDescription': this.videoClassModal ? 'Descrição da aula aqui xyz' : '',
            'coverClass': this.videoClassModal?.cover || '',
            'urlVideoClass': this.videoClassModal?.video || ''
        };

        this.createForm(formControls);
    }

    createForm(formControls: { [key: string]: string }): void {
        this.form = new FormGroup({
            'className': new FormControl(formControls['className']),
            'classDescription': new FormControl(formControls['classDescription']),
            'coverClass': new FormControl(formControls['coverClass']),
            'urlVideoClass': new FormControl(formControls['urlVideoClass'])
        });
    }

    submit(): void {
        this.loading = true;

        if (!this.form.valid) {
            this.toastr.error('', 'Preencha todos os campos');
            return;
        }

        const newClass: VideoClass = {
            _id: this.videoClassModal?._id || undefined,
            title: this.form.value.className,
            cover: this.form.value.coverClass,
            video: this.form.value.urlVideoClass
        }

        if (this.editing) {
            this.updateClass(newClass);
            return;
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

    updateClass(data: VideoClass): void {
        this.loading = true;
        this.classesService.updateClass(data).subscribe({
            next: (result) => {
                this.toastr.success('', 'Aula atualizada com sucesso');
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
