import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators'
import { Router } from '@angular/router';

interface AuthenticationResponse {
    accessToken: string,
    tokenType: string,
    jwtExpirationInMs: number,
    user: User
}

interface SignupResponse {
    success: boolean,
    message: string
}

@Injectable()
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(signupData: FormGroup) {
        return this.http.post<SignupResponse>('https://hetom-recipebookbackend.herokuapp.com/auth/signup', signupData);
    }

    login(loginData: FormGroup) {
        return this.http.post<AuthenticationResponse>('https://hetom-recipebookbackend.herokuapp.com/auth/signin', loginData)
            .pipe(tap(
                response => {
                    const expirationDate = new Date(new Date().getTime() + response.jwtExpirationInMs);
                    const accessToken = response.tokenType + ' ' + response.accessToken;
                    const user = new User(
                        response.user.id,
                        response.user.username,
                        response.user.name,
                        response.user.email,
                        accessToken,
                        expirationDate);
                    this.user.next(user);
                    this.autoLogout(response.jwtExpirationInMs);
                    localStorage.setItem('userData', JSON.stringify(user));
                }
            ));
    }

    autoLogin() {
        const userData: {
            id: string,
            username: string,
            name: string,
            email: string,
            _accessToken: string,
            _tokenExpirationDate: string

        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            +userData.id,
            userData.username,
            userData.name,
            userData.email,
            userData._accessToken,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.accessToken) { 
            this.user.next(loadedUser);
            const expirationInMs = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationInMs);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationInMs: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationInMs);
    }
}