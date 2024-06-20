import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfigurationStore } from '../../store/configuration.store';
import { ProfileStore } from '../../store/profile.store';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {
  authService = inject(AuthService);
  profileStore = inject(ProfileStore);
  configurationStore = inject(ConfigurationStore);

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.profileStore.loggedIn()) {
      // to be able to login, configuration need to be fetched from API prior to login
      console.log(
        'canActivate, is configuration loaded: ',
        this.configurationStore.isConfigurationLoaded!()
      );
      if (!this.configurationStore.isConfigurationLoaded!()) {
        // TODO: redirect to error page
        return false;
      }

      await this.authService.login();
    }

    const isAuthenticated = this.authService.waitUntilAuthentication$.pipe(
      switchMap((isAuthenticated) =>
        isAuthenticated ? of(this.profileStore.loggedIn()) : of(isAuthenticated)
      )
    );

    return isAuthenticated.pipe(
      take(1),
      map((isAuthenticated) => {
        return isAuthenticated;
      })
    );
  }
}