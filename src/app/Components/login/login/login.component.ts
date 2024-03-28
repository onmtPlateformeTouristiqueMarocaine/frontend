import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    localStorage.setItem("IsLogged","true")

    const customEvent = new CustomEvent('IsLoggedEvent', {
      detail: {
        message: 'The user Is loggeed'
      }
    });

    window.dispatchEvent(customEvent);
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem("IsLogged","true")
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
           this.error = error.error;
        } else {
          // Gestion normale des erreurs
          this.error = "An error occurred during login";
        }
        console.log("Erreur de connexion :", error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
