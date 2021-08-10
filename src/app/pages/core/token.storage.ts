import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor(
    private _router:Router
  ) { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
    this._router.navigate(['/'])
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
