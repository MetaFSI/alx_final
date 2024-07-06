import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Check if the user is already authenticated, and if so, redirect to the main page.
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.authService.authenticate(this.userName, this.password).subscribe(
      (response) => {
        if (response && response.access_token) {
          console.log('Authentication successful', response);
          this.router.navigate(['/']);
        } else {
          console.error('Authentication failed. Invalid token received.');
        }
      },
      (error) => {
        console.error('Authentication failed', error);
      }
    );
  }
}
