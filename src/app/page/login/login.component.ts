import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { hostport, Alert } from '../../constant.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  login_page_type: any;
  SignIn: any;
  loginScreen: any;
  forgotPassword: any;
  resetPassword: any;

  ngOnInit(): void {
    this.loginScreen = true;
    this.forgotPassword = false;
    this.resetPassword = false;
    this.SignIn = 'Sign in';

    // Check if browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      this.login_page_type = localStorage.getItem('login_page_type');
    }
  }

  forgotPasswordOpen() {
    if (typeof window !== 'undefined') {
      // Check again before using localStorage
      localStorage.setItem('login_page_type', 'recover_password');
      this.login_page_type = localStorage.getItem('login_page_type');
    }
  }

  backToLogin() {
    this.loginScreen = true;
    this.forgotPassword = false;
    this.resetPassword = false;
    this.passwordTxt = '';
    this.confirmPasswordTxt = '';
    this.otpTxt = '';
  }

  forgotPasswordC() {
    this.loginScreen = false;
    this.forgotPassword = true;
    this.resetPassword = false;
  }

  countdown: any;
  forgotPasswordSubmit() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(this.emailTxt) === false) {
      alert(Alert.emailId);
      return false;
    }

    var postdata = {
      email: this.emailTxt,
    };
    const url = hostport + 'user/forgot/password';
    this.http.post<any>(url, postdata).subscribe(
      (res) => {
        const result = res;
        if (result.data === 'Data Not Found') {
          alert('Your Email Id is not found');
          return false;
        } else {
          this.loginScreen = false;
          this.forgotPassword = false;
          this.resetPassword = true;
          alert('Verification OTP has been sent to your Email Id');
          this.countdown = 60;
          const countdownInterval = setInterval(() => {
            this.countdown--;
            if (this.countdown === 0) {
              clearInterval(countdownInterval);
            }
          }, 1000);
        }
        return false;
      },
      (error) => {
        this.SignIn = 'Sign in';
        var valid = error.error; // Fixing the error handling
        alert(valid.data);
      }
    );
    return true;
  }

  confirmPasswordTxt: any;
  otpTxt: any;

  resetPasswordSub() {
    if (this.passwordTxt !== this.confirmPasswordTxt) {
      alert('Password and Confirm Password not matched');
      return false;
    }
    var postdata = {
      email: this.emailTxt,
      otp: this.otpTxt,
    };
    const url = hostport + 'user/otp/verify';
    this.http.post<any>(url, postdata).subscribe(
      (res) => {
        const result = res;
        if (result.data === 'Incorrect OTP') {
          alert('Incorrect OTP');
          return false;
        } else {
          this.resetPasswordSubmit();
        }
        return false;
      },
      (error) => {
        this.SignIn = 'Sign in';
        var valid = error.error;
        alert(valid.data);
      }
    );
    return false;
  }

  resetPasswordSubmit() {
    var postdata = {
      email: this.emailTxt,
      password: this.passwordTxt,
    };
    const url = hostport + 'user/reset/password';
    this.http.post(url, postdata).subscribe(
      (res) => {
        const result = res;
        this.loginScreen = true;
        this.forgotPassword = false;
        this.resetPassword = false;
        alert('Password changed successfully');
      },
      (error) => {
        this.SignIn = 'Sign in';
        var valid = error.error;
        alert(valid.data);
      }
    );
    return true;
  }

  emailTxt: any;
  passwordTxt: any;
  signIn() {
    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    // if (reg.test(this.emailTxt) === false) {
    //   alert(Alert.emailId);
    //   return false;
    // }

    // this.SignIn = 'Please Wait';
    // var postdata = {
    //   "email": this.emailTxt,
    //   "password": this.passwordTxt,
    // }
    const url = hostport + 'login';
    this.router.navigate(['/Admin/dashboard']).then(() => {
      window.location.reload();
    });
    // this.http.post<any>(url, postdata)
    // .subscribe(res => {
    //   const result = res;
    //   console.log(result, 'result');
    //   if (result.data.isActive === false) {
    //     alert(Alert.AccountDeactive);
    //     this.SignIn = 'Sign in';
    //     return false;
    //   } else {
    //     setTimeout(() => {
    //       localStorage.setItem('token', result.token);
    //       localStorage.setItem('userDetails', JSON.stringify(result.data));
    //       this.router.navigate(['/Admin/dashboard']).then(() => {
    //         window.location.reload();
    //       });
    //     }, 300);
    //   }
    //   return false;
    // },
    // error => {
    //   this.SignIn = 'Sign in';
    //   var valid = error.error;
    //   alert(valid.data);
    // });
    return true;
  }

  showPassword = false;
  viewPassword() {
    let x: any = document.getElementById('inputPassword');
    if (x.type === 'password') {
      x.type = 'text';
      this.showPassword = true;
    } else {
      x.type = 'password';
      this.showPassword = false;
    }
  }

  showPassword2 = false;
  viewPassword2() {
    let x: any = document.getElementById('inputPassword2');
    if (x.type === 'password') {
      x.type = 'text';
      this.showPassword2 = true;
    } else {
      x.type = 'password';
      this.showPassword2 = false;
    }
  }
}
