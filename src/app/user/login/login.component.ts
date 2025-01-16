import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {} 

  isPasswordVisible: boolean = false;

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }
  tohome(event: Event){
    event.preventDefault(); // Prevent form submission from reloading the page

    // Perform login logic here (mock or real login logic)
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (username && password) {
      // Replace this with actual authentication logic
      console.log('Login successful:', username, password);

      // Navigate to the home page
      this.router.navigate(['/home']);
    } else {
      alert('Please enter both username and password.');
    }
  }
}
