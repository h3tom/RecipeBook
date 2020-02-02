import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators'

interface AuthenticationResponse {
    accessToken: string,
    tokenType: string,
    jwtExpirationInMs: number,
    user: User
}

@Injectable()
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) { }

    login(loginData: FormGroup) {
        return this.http.post<AuthenticationResponse>("http://localhost:8080/auth/signin", loginData)
            .pipe(tap(
                response => {
                    const expirationDate = new Date(new Date().getTime() + response.jwtExpirationInMs);
                    const accessToken = response.tokenType + " " + response.accessToken;
                    const user = new User(
                        response.user.id,
                        response.user.username,
                        response.user.name,
                        response.user.email,
                        accessToken,
                        expirationDate);
                    this.user.next(user);
                }
            ));
    }
}