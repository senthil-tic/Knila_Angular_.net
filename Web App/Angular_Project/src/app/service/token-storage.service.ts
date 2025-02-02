import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  signOut(): void {
    localStorage.clear(); 
  }
  public getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('token');
      }
      return null;
  }
}
