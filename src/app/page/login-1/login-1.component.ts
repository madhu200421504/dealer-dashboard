import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  ViewChildren,
  QueryList,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { verify } from 'crypto';
import { ToastrService } from 'ngx-toastr';

// interface LoginResponse {
//   token: string;
//   message?: string;
// }

interface LoginResponse {
  status: number;
  message: string;
  data?: {
    token: string;
  };
}

interface LoginData {
  dealer_email: string;
  password: string;
  otp: number | null;
  confirmPassword: string;
  newPwd: string;
}

interface verifyData {
  dealer_email: string;
}

@Component({
  selector: 'app-login-1',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-1.component.html',
  styleUrls: ['./login-1.component.css'],
})
export class Login1Component {
  @ViewChildren('inputElement') inputElements:
    | QueryList<ElementRef>
    | undefined;

  loginObj: LoginData = {
    dealer_email: '',
    password: '',
    otp: 0,
    confirmPassword: '',
    newPwd: '',
  };

  verifyObj: verifyData = {
    dealer_email: '',
  };

  // View control flags
  currentStep: 'login' | 'verifyEmail' | 'verifyOtp' | 'newPassword' = 'login';
  showPassword = false;
  showConfirmPassword = false;
  countdown = 0;
  private countdownInterval: any;

  private readonly API_BASE_URL = 'https://uat.smartassistapp.in/api/';
  private readonly SESSION_TIMEOUT = 60 * 60 * 1000;

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly renderer = inject(Renderer2);

  constructor() {}

  ngAfterViewInit() {
    if (this.inputElements) {
      this.inputElements.toArray().forEach((input) => {
        this.renderer.listen(
          input.nativeElement,
          'focus',
          this.addClass.bind(this)
        );
        this.renderer.listen(
          input.nativeElement,
          'blur',
          this.removeClass.bind(this)
        );
      });
    }
  }

  // Navigation methods
  showVerifyEmail() {
    this.currentStep = 'verifyEmail';
    this.resetFormExceptEmail();
  }

  showVerifyOtp() {
    this.currentStep = 'verifyOtp';
  }

  showNewPassword() {
    this.currentStep = 'newPassword';
  }

  backToLogin() {
    this.currentStep = 'login';
    window.location.reload();
    this.resetForm();
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private resetForm() {
    this.loginObj = {
      dealer_email: '',
      newPwd: '',
      otp: null,
      confirmPassword: '',
      password: '',
    };
  }

  private resetFormExceptEmail() {
    const email = this.loginObj.dealer_email;
    this.resetForm();
    this.loginObj.dealer_email = email;
  }

  // Password visibility toggles
  togglePassword(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Form validation methods
  private validateLoginInput(): boolean {
    if (!this.loginObj.dealer_email || !this.loginObj.password) {
      this.toastr.error(
        'Please enter both email and password',
        'Validation Error'
      );
      return false;
    }
    if (!this.isValidEmail(this.loginObj.dealer_email)) {
      this.toastr.error(
        'Please enter a valid email address',
        'Validation Error'
      );
      return false;
    }
    return true;
  }

  private validateNewPassword(): boolean {
    if (!this.loginObj.newPwd || !this.loginObj.confirmPassword) {
      this.toastr.error('Please enter both passwords', 'Validation Error');
      return false;
    }
    if (this.loginObj.newPwd !== this.loginObj.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Validation Error');
      return false;
    }
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // API interaction methods
  // onLogin() {
  //   if (!this.validateLoginInput()) return;

  //   this.http
  //     .post<LoginResponse>(
  //       `${this.API_BASE_URL}login/super-admin`,
  //       this.loginObj
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         if (response.token) {
  //           this.handleSuccessfulLogin(response.token);
  //         } else {
  //           this.toastr.error('Invalid credentials', 'Error');
  //         }
  //       },
  //       error: (error) => {
  //         console.error('Login error:', error);
  //         const errorMessage = error.error.error;
  //         this.toastr.error(errorMessage, 'Error');
  //       },
  //     });
  // }

  onLogin() {
    if (!this.validateLoginInput()) return;

    // Modify the loginObj to match the expected payload structure
    const loginObj = {
      dealer_email: this.loginObj.dealer_email, // Use dealer_email instead of email
      password: this.loginObj.password,
    };

    console.log('Payload:', loginObj); // 👉 This will show the updated payload

    this.http
      .post<LoginResponse>(`${this.API_BASE_URL}login/dealer`, loginObj)
      .subscribe({
        next: (response) => {
          if (response.status === 200 && response.data?.token) {
            this.handleSuccessfulLogin(response.data.token);
          } else {
            this.toastr.error(
              response.message || 'Invalid credentials',
              'Error'
            );
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          const errorMessage = error.error?.message || 'An error occurred';
          this.toastr.error(errorMessage, 'Error');
        },
      });
  }

  onVerifyEmail() {
    if (
      !this.verifyObj.dealer_email ||
      !this.isValidEmail(this.verifyObj.dealer_email)
    ) {
      this.toastr.error(
        'Please enter a valid email address',
        'Validation Error'
      );
      return;
    }

    this.http
      .post(`${this.API_BASE_URL}login/dealer/forgot-pwd/verify-email`, {
        dealer_email: this.verifyObj.dealer_email,
      })
      .subscribe({
        next: () => {
          this.toastr.success('OTP sent to your email', 'Success');
          this.showVerifyOtp();
          this.startCountdown();
        },
        error: (error) => {
          // console.error('Email verification error:', error);
          console.log(error.error.error);
          const errorMessage = error.error.error;
          this.toastr.error(errorMessage, 'Error');
        },
      });
  }

  onVerifyOtp() {
    if (this.loginObj.otp === null || isNaN(Number(this.loginObj.otp))) {
      this.toastr.error('Please enter a valid OTP', 'Validation Error');
      return;
    }

    const otpPayload = {
      otp: Number(this.loginObj.otp),
      dealer_email: this.verifyObj.dealer_email,
    };

    this.http
      .post(
        `${this.API_BASE_URL}login/dealer/forgot-pwd/verify-otp`,
        otpPayload
      )
      .subscribe({
        next: () => {
          this.toastr.success('OTP verified successfully', 'Success');
          this.showNewPassword();
        },
        error: (error) => {
          console.error('OTP verification error:', error);
          const errorMessage = error.error.error;
          this.toastr.error(errorMessage, 'Error');
        },
      });
  }

  onOtpInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Remove any non-numeric characters
    const numericValue = input.value.replace(/[^0-9]/g, '');

    // Update the loginObj with the numeric value
    this.loginObj.otp = numericValue ? Number(numericValue) : 0;

    // Update the input value to show only numbers
    input.value = numericValue;
  }

  //   onSetNewPassword() {
  //     if (!this.validateNewPassword()) return;

  //     const resetPasswordData = {
  //       email: this.loginObj.email,
  //       newPassword: this.loginObj.newPwd,
  //       confirmPwd: this.loginObj.confirmPassword
  //     };

  //     this.http.put<any>(`${this.API_BASE_URL}login/s-admin/forgot-pwd/new-pwd`, resetPasswordData)
  //       .subscribe({
  //         next: (response) => {
  //           this.toastr.success('Password reset successfully', 'Success');
  //           this.backToLogin();
  //         },
  //         error: (error) => {
  //           console.error('Password reset error:', error);
  //           if (error.status === 400) {
  //             this.toastr.error('Invalid request. Please check your inputs.', 'Error');
  //           } else if (error.status === 404) {
  //             this.toastr.error('User not found', 'Error');
  //           } else {
  //             const errorMessage = error.error?.message || 'Failed to reset password';
  //             this.toastr.error(errorMessage, 'Error');
  //           }
  //         },
  //         complete: () => {
  //           this.loginObj.newPwd = '';
  //           this.loginObj.confirmPassword = '';
  //         }
  //       });
  // }

  onSetNewPassword() {
    if (!this.validateNewPassword()) return;

    const resetPasswordData = {
      dealer_email: this.verifyObj.dealer_email,
      newPwd: this.loginObj.newPwd,
      confirmPwd: this.loginObj.confirmPassword,
    };

    this.http
      .put<any>(
        `${this.API_BASE_URL}login/dealer/forgot-pwd/new-pwd`,
        resetPasswordData
      )
      .subscribe({
        next: (response) => {
          this.toastr.success('Password reset successfully', 'Success');
          window.location.reload();
          this.backToLogin();
        },
        error: (error) => {
          console.error('Password reset error:', error);
          if (error.status === 400) {
            this.toastr.error(
              'Invalid request. Please check your inputs.',
              'Error'
            );
          } else if (error.status === 404) {
            this.toastr.error('User not found', 'Error');
          } else {
            const errorMessage = error.error.error;
            this.toastr.error(errorMessage, 'Error');
          }
        },
        complete: () => {
          // Clear sensitive data
          this.loginObj.newPwd = '';
          this.loginObj.confirmPassword = '';
        },
      });
  }

  // private handleSuccessfulLogin(token: string): void {
  //   this.toastr.success('Login Successful', 'Success');
  //   sessionStorage.setItem('adminToken', token);

  //   this.router
  //     .navigate(['/Admin/dashboard'])
  //     .then(() => window.location.reload())
  //     .catch((error) => {
  //       console.error('Navigation error:', error);
  //       this.toastr.error('Failed to navigate to dashboard', 'Error');
  //     });

  //   this.setupAutoLogout();
  // }

  private handleSuccessfulLogin(token: string): void {
    // Store token in localStorage instead of sessionStorage
    sessionStorage.setItem('token', token);

    // Navigate to dashboard using router without page reload
    this.router
      .navigate(['/Admin/dashboard'])
      .then(() => {
        window.location.reload();
        this.toastr.success('Login Successful', 'Success');
      })
      .catch((error) => {
        console.error('Navigation error:', error);
        this.toastr.error('Failed to navigate to dashboard', 'Error');
      });

    this.setupAutoLogout();
  }

  // private setupAutoLogout(): void {
  //   setTimeout(() => {
  //     sessionStorage.removeItem('adminToken');
  //     this.router
  //       .navigateByUrl('/login')
  //       .then(() => {
  //         this.toastr.info(
  //           'Session expired. Please log in again.',
  //           'Session Expired'
  //         );
  //       })
  //       .catch((error) => {
  //         console.error('Logout navigation error:', error);
  //       });
  //   }, this.SESSION_TIMEOUT);
  // }

  private setupAutoLogout(): void {
    // Use localStorage timeout instead of sessionStorage
    setTimeout(() => {
      sessionStorage.removeItem('token');
      this.router
        .navigateByUrl('/login')
        .then(() => {
          this.toastr.info(
            'Session expired. Please log in again.',
            'Session Expired'
          );
        })
        .catch((error) => {
          console.error('Logout navigation error:', error);
        });
    }, this.SESSION_TIMEOUT);
  }

  private startCountdown() {
    this.countdown = 5 * 60;
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  // Utility methods for input styling
  addClass(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentNode
      ?.parentNode as Element;
    if (parent) {
      parent.classList.add('focus');
    }
  }

  removeClass(event: FocusEvent): void {
    const parent = (event.target as HTMLElement).parentNode
      ?.parentNode as Element;
    if (parent && (event.target as HTMLInputElement).value === '') {
      parent.classList.remove('focus');
    }
  }
}
