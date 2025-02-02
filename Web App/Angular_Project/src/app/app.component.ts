import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './service/auth.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./toast/toast.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular_Project';
  isLoginPage = false;

  constructor(
    private router: Router,
    private authservice:AuthenticationService,
 
  ) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url.includes('/login'); 
    });
  }

  logout(){
      this.authservice.logout()
      this.router.navigate(['/login']);
  }
}
