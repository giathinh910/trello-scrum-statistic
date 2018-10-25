import { Injectable } from '@angular/core';
import { APIService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientStorageService } from './client-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticService extends APIService {
  constructor(private http: HttpClient,
              private clientStorageService: ClientStorageService) {
    super();
  }

  getBoards(): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/me/boards`, {
      params: {
        key: this.clientStorageService.getAppKey(),
        token: this.clientStorageService.getAppToken()
      }
    });
  }
}
