import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './LandingPage.component.html',
  styleUrls: ['./LandingPage.component.css']
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToStaffLogin(): void {
    this.router.navigate(['/staff-login']);
  }
  // You can add interactivity here later if needed
}




