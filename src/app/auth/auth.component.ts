import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;
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

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
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
        } else {
        }
    }

}