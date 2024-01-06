import { Component, OnInit } from '@angular/core';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LoginComponent } from '../../components/login/login.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [SelectButtonModule, SignUpComponent, LoginComponent],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit {

    stateOptions: any[] = [{ label: 'Login', value: false }, { label: 'Sign Up', value: true }];
    loginOrSignUp = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.verifyUser();
    }

    selectOption(option: SelectButtonChangeEvent): void {
        this.loginOrSignUp = option.value;
    }

    verifyUser(): void {
        this.authService.hasAuthToken() ?
            this.router.navigate(['/classes']) :
            this.router.navigate(['/auth']);
    }


}
