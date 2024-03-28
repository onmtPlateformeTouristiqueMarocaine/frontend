import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: string | null = null;

  constructor(private authService: AuthService) { }

  get IsAuthentificate(){
    console.log("hjhkhj",this.isAuthenticated)
    return this.isAuthenticated;
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log(this.authService.isAuthenticated())

    // Récupérer le nom de l'utilisateur s'il est authentifié
    if (this.isAuthenticated) {
      this.userName = this.authService.getUserName();
    }

    window.addEventListener("IsLoggedEvent",(e)=>{
      this.isAuthenticated = this.authService.isAuthenticated();
    })
  }
 
  Logout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
