import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './LandingPage.component.html',
  styleUrls: ['./LandingPage.component.css']
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToStaffLogin(): void {
    this.router.navigate(['/doctor-login']);
  }
  // You can add interactivity here later if needed
}