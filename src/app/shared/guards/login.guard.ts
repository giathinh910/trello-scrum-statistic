import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientStorageService } from '../services/client-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private clientStorageService: ClientStorageService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const notHasToken = !this.clientStorageService.getAppKey() || !this.clientStorageService.getAppToken();
    if (!notHasToken) {
      this.router.navigate(['/']);
    }
    return notHasToken;
  }
}
