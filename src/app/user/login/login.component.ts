import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,AngularFireAuthModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router,
    private itemService: ItemService,
    private afAuth: AngularFireAuth // DI instead of using inject()
  ) {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.router.navigate(['/home']); // Navigate to the home page if the user is already logged in
      }
    });
  } 

  isPasswordVisible = false;

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (passwordField) {
      passwordField.type = this.isPasswordVisible ? 'text' : 'password';
    }
  }
  async onLogin() {
    try {
      // Directly use AngularFireAuth to sign in
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      alert('Login successful!');
      this.router.navigate(['/home']); // Navigate to the home page after login
    } catch (error: any) {
      // Provide more user-friendly error messages
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Incorrect password. Please try again.';
      } else {
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
    }
  }
}
