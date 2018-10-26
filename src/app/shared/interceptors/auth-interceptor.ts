import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientStorageService } from '../services/client-storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private clientStorageService: ClientStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.clientStorageService.getAppKey() && this.clientStorageService.getAppKey()) {
      let cloneParams = new HttpParams({ fromString: req.params.toString() });
      cloneParams = cloneParams.append('key', this.clientStorageService.getAppKey());
      cloneParams = cloneParams.append('token', this.clientStorageService.getAppToken());
      req = req.clone({
        params: cloneParams
      });
    }
    return next.handle(req);
  }
}
