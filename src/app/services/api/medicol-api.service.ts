import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MedicolApiService {
  private apiUrl = 'http://10.0.0.65:3015/api/references';

  constructor(private http: HttpClient, private authService:AuthService) {}

  getData() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.getAccessToken(),
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
