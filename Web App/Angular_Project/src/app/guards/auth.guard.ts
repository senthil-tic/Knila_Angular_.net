import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
        private tokenService: TokenStorageService,
    ) { }


    canActivate(): boolean {
        const isLoggedIn = !!this.tokenService.getToken();
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
}
