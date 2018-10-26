import { Injectable } from '@angular/core';
import { APIService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService extends APIService {
  constructor(private http: HttpClient) {
    super();
  }

  getBoards(): Observable<any> {
    return this.http.get(`${this.apiUrl}/members/me/boards`);
  }

  getBoardDetail(boardId): Observable<any> {
    return this.http.get(`${this.apiUrl}/boards/${boardId}`);
  }

  getBoardCards(boardId): Observable<any> {
    return this.http.get(`${this.apiUrl}/boards/${boardId}/cards`);
  }

  getBoardLists(boardId): Observable<any> {
    return this.http.get(`${this.apiUrl}/boards/${boardId}/lists`);
  }
}
