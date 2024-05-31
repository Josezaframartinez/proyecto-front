import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userProfile = '';
  userName = '';
  userPhoto = '';
  perfil: number = 0;

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.checkSession();
    // Subscribe to router events to check session on every navigation
    this.router.events.subscribe(() => {
      this.checkSession();
    });
  }

  checkSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
      const sessionData = JSON.parse(session);
      this.isLoggedIn = true;
      this.userProfile = sessionData.perfil;
      this.userName = sessionData.nombres;
      this.userPhoto = sessionData.foto;
      this.perfil = sessionData.perfil;  // Set perfil value
    } else {
      this.isLoggedIn = false;
      this.userProfile = '';
      this.userName = '';
      this.userPhoto = '';
      this.perfil = 0;  // Reset perfil value
    }
  }

  logout() {
    localStorage.removeItem('userSession');
    this.isLoggedIn = false;
    this.userProfile = '';
    this.userName = '';
    this.userPhoto = '';
    this.perfil = 0;  // Reset perfil value
    this.router.navigate(['/iniciosesion']);
  }
}
