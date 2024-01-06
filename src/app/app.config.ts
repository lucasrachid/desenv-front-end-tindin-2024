import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthenticationService } from './services/authentication/authentication.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    AuthenticationService,
    MessageService,
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot({
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
    })),
    provideHttpClient(withFetch()),
    provideAnimations()
]
};
