import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientStorageService } from '../services/client-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private clientStorageService: ClientStorageService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const hasToken = !!this.clientStorageService.getAppKey() && !!this.clientStorageService.getAppToken();
    if (!hasToken) {
      this.router.navigate(['auth']);
    }
    return hasToken;
  }
}
