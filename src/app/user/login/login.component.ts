import { Component, inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User, ItemService } from '../../services/item.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private itemService = inject(ItemService);
  
  constructor(private router: Router) {} 


  isPasswordVisible = false;

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }
 async login() {
  const success = await this.itemService.loginUser(this.username, this.password);
  if (success) {
    this.router.navigate(['/home']);
  } else {
    this.errorMessage = 'Invalid username or password.';
  }
}

async register() {
  try {
    await this.itemService.registerUser(this.username, this.password);
    this.router.navigate(['/home']); // or show success message
  } catch (error) {
    this.errorMessage = 'Registration failed.';
  }
}
}
