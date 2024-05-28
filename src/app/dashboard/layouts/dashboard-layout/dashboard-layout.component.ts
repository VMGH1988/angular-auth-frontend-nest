import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );
  public user = computed(() => this.authService.currentUser() );
  contador = 10;


  constructor(private router: Router) {
    if(this.user()?.isActive === false){this.startCountdown();}

  }

  startCountdown() {
    const countdownInterval = setInterval(() => {
      if (this.contador > 0) {
        this.contador--;
      } else {
        clearInterval(countdownInterval);
        window.location.reload();
      }
    }, 1000);
  }


  get banned():boolean{
    return this.user()?.isActive === true;
  }

  get showButton(): boolean {

    return this.router.url!== '/dashboard/admin';


  }

  get showButton2(): boolean {
    return this.router.url!== '/dashboard/user';

  }
  get showButton3(): boolean {
    return this.user()?.roles?.includes('admin') || false;
  }

  onLogout() {
    this.authService.logout();
  }

}
