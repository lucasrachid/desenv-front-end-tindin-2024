import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/user.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
    loading = false;
    form!: FormGroup;
    controls!: { [key: string]: AbstractControl };

    constructor(
        private toastr: ToastrService,
        private authService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = new FormGroup({
            name: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl(''),
        })
        this.controls = this.form.controls;
    }

    submit(): void {
        this.loading = true;

        if (!this.form.valid) {
            this.toastr.error('', 'Preencha todos os campos');
            return;
        }

        const newUser: User = {
            name: this.form.value.name,
            email: this.form.value.email,
            password: this.form.value.password
        };

        const validatePassword = this.passwordValidate(this.form.value.password);
        if (!validatePassword) {
            this.loading = false;
            return;
        }

        this.authService.signUp(newUser).subscribe({
            next: () => {
                this.toastr.success('', 'Conta criada com sucesso');
                this.router.navigate(['/classes']);
                this.loading = false;
            }, error: (httpResponse) => {
                this.toastr.error('', httpResponse.error.message);
                this.loading = false;
            }
        });


    }

    passwordValidate(password: string): boolean {
        const minLenght = 6;

        if (!password || password == '' || password.length < minLenght) {
            this.toastr.error('', 'Por favor, preencha a sua senha com pelo menos 6 caracteres');
            return false;
        }

        const regexUppercase = /[A-Z]/;
        const regexLowercase = /[a-z]/;
        const regexNumber = /[0-9]/;

        if (!regexUppercase.test(password)) {
            this.toastr.error('', 'Sua senha deve conter letras maiúsculas');
            return false;
        }

        if (!regexLowercase.test(password)) {
            this.toastr.error('', 'Sua senha deve conter letras minúsculas');
            return false;
        }

        if (!regexNumber.test(password)) {
            this.toastr.error('', 'Sua senha deve conter números');
            return false;
        }

        return true;
    }

}
