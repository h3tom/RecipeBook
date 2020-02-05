import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;
    signupForm: FormGroup;
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.initLoginForm();
    }

    private initLoginForm() {
        this.loginForm = new FormGroup({
            usernameOrEmail: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        })
    }

    private initSignUpForm() {
        this.signupForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
            username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
            email: new FormControl(null, [Validators.required, Validators.maxLength(40), Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
        })
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
        this.isLoginMode ? this.initLoginForm() : this.initSignUpForm();
    }

    onSubmit() {
        // Log In Form 
        if (this.isLoginMode) {
            if (!this.loginForm.valid) {
                return;
            }
            this.isLoading = true;
            this.authService.login(this.loginForm.value).subscribe(
                response => {
                    this.isLoading = false;
                    this.loginForm.reset();
                    this.router.navigate(['/recipes']);
                },
                error => {
                    if (error.status == 400) {
                        this.error = 'Server error, please fill correctly all fields.';
                    } else if (error.status == 401) {
                        this.error = 'Unauthorized, please try again.';
                    } else {
                        this.error = 'Unexpected error occurred, please try again later.';
                    }
                    this.isLoading = false;
                }
            );
            // Sign Up Form
        } else {
            if (!this.signupForm.valid) {
                return;
            }
            this.isLoading = true;
            this.authService.signup(this.signupForm.value).subscribe(
                response => {
                    if (response.success) {
                        alert(response.message + ', please Log In.');
                        this.isLoading = false;
                        this.signupForm.reset();
                    }
                },
                error => {
                    if (!error.error) {
                        this.error = 'Unexpected error occurred, please try again later.';
                    } else if (error.error.message.includes('Validation')) {
                        this.error = 'Validation failed, please fill correctly all fields.'
                    } else {
                        this.error = error.error.message;
                    }
                    this.isLoading = false;
                }
            )
        }
    }

}