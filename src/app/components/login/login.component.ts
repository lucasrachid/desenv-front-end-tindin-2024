import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { Auth, ERROR_RESPONSE } from '../../model/auth.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    loading = false;
    form!: FormGroup;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        });
    }

    submit(): void {
        this.loading = true;

        if (!this.form.valid) {
            this.toastr.error('', 'Preencha todos os campos');
            return;
        }

        const userToLogin: User = {
            email: this.form.value.email,
            password: this.form.value.password
        }

        this.authService.login(userToLogin).subscribe({
            next: (response: Auth) => {
                localStorage.setItem('authToken', JSON.stringify(response));
                this.toastr.success('', 'Usuário autenticado com sucesso');
                this.router.navigate(['/classes']);
                this.loading = false;
            }, error: (httpResponse) => {
                let message;
                if (httpResponse.error.type === ERROR_RESPONSE.INVALID_PASSWORD_OR_EMAIL) {
                    message = 'Email ou senha inválidos';
                }
                message = 'Erro ao realizar login';
                this.toastr.error('', message);
                this.loading = false;
            }
        })
    }

}
