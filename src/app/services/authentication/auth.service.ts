import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  private apiUrl = 'http://10.0.0.65:3015/api/auth/login';
  private accessToken: string | null = localStorage.getItem('access_token'); 

  constructor(private http: HttpClient, private router: Router) {}

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('access_token', token); 
  }
  getAccessToken(): string | null {
    return this.accessToken;
  }

  authenticate(username: string, password: string): Observable<any> {
    const requestBody = {
      username: username,
      password: password,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(this.apiUrl, requestBody, httpOptions).pipe(
      map((response: any) => {
        this.setAccessToken(response.access_token);
        console.log('Access token stored:', response.access_token);
        return response;
      })
    );
  }
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated()) {
      return true;
      this.router.navigate(['/']);
    } else {
      console.log('User is not authenticated. Redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
