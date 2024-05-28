import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';


@Component({
  templateUrl: './user-page.component.html',
  styles: ``
})
export class UserPageComponent {

  private authService = inject( AuthService );

  public user = computed(() => this.authService.currentUser() );

  onLogout() {
    this.authService.logout();
  }

}
