import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiInQueueCount: number = 0;
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:7009/';
  }

  // Method to get the token from localStorage if available
  private getTokenFromLocalStorage(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null; // Return null if localStorage is not available
  }

  private createHeaders(): HttpHeaders {
    const token = this.getTokenFromLocalStorage();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '', // Only add Bearer if token exists
    });
    return headers;
  }

  ngOnInit(): void {}

  get(url: string) {
    const headers = this.createHeaders(); // Use dynamic headers
    return this.http.get<any>(this.baseUrl + url, { headers }).pipe(
      map((response) => response)
    );
  }

  getById(url: string, id: number) {
    const headers = this.createHeaders(); // Use dynamic headers
    return this.http.get(this.baseUrl + url + '/' + id, { headers });
  }

  insert(url: string, data: any): Observable<any> {
    const headers = this.createHeaders(); // Use dynamic headers
    return this.http.post<any>(this.baseUrl + url, data, { headers }).pipe(
      map((response: any) => response)
    );
  }

  update(url: string, data: any) {
    const headers = this.createHeaders(); // Use dynamic headers
    return this.http.put<any>(this.baseUrl + url, data, { headers }).pipe(
      map((response) => response)
    );
  }

  delete(url: string) {
    const headers = this.createHeaders(); // Use dynamic headers
    return this.http.delete(this.baseUrl + url , { headers }).pipe(
      map((response) => response)
    );
  }

  post(url: string, data: any) {
    const headers = this.createHeaders(); // Use dynamic headers
    return this.http.post<any>(this.baseUrl + url, data, { headers }).pipe(
      map((response) => response)
    );
  }

  bufferLoader(visibility: boolean) {
    if (visibility) {
      this.apiInQueueCount = this.apiInQueueCount + 1;
    } else {
      this.apiInQueueCount = this.apiInQueueCount - 1;
    }

    const preloader = document.getElementById('preloader') as HTMLElement;
    if (this.apiInQueueCount !== 0) {
      preloader.style.opacity = '0.5';
      preloader.style.visibility = 'visible';
    }
    if (this.apiInQueueCount === 0) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }
  }
}
