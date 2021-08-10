import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config.http';

@Injectable()
export class AuthService {

  api = URL_SERVICIOS;

  constructor(
    private http: HttpClient,
    public router: Router,
  ) {
  }

  attemptAuth(usernameOrEmail: string, password: string): Observable<any> {
    const credentials = { usernameOrEmail: usernameOrEmail, password: password };
    console.log(credentials);

    return this.http.post(this.api + '/auth/signin', credentials).pipe(map(res => {
      // console.log(res);
      return res;
    }))
  }


}
