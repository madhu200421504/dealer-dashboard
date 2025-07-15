// // import { bootstrapApplication } from '@angular/platform-browser';
// // import { appConfig } from './app/app.config';
// // import { AppComponent } from './app/app.component';

// // bootstrapApplication(AppComponent, appConfig)

// //   .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { authInterceptor } from './app/auth.interceptor'; // ✅ Correct
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes'; // ✅ Corrected import
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';
// import { ToastrModule } from 'ngx-toastr';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withInterceptors([authInterceptor])),
//     provideRouter(routes), // ✅ use correct variable
//     provideAnimations(),
//     importProvidersFrom(ToastrModule.forRoot()),
    
//   ],
// }).catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes), // ✅ Removed unsupported options
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot()),
  ],
}).catch((err) => console.error(err));
