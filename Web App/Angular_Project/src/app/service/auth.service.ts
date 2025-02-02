import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  constructor(private http: HttpClient) {}
 
  login(email: string, password: string) {

    return this.http.post<any>('https://localhost:7009/api/Auth/login', { email, password }, httpOptions).pipe(
      map((response) => {
        // Assuming response has data and token properties
        localStorage.setItem('toast', 'true');
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        localStorage.setItem('token', response.token);
        return response;
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth-token');
  }


}
