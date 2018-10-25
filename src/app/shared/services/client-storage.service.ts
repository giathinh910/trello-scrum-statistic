import { Injectable } from '@angular/core';

class ClientStorageKeyName {
  static appKey = '1540438621083';
  static appToken = '1540438686142';
}

@Injectable({
  providedIn: 'root'
})
export class ClientStorageService {
  constructor() {
  }

  setAppKey(value) {
    localStorage.setItem(ClientStorageKeyName.appKey, value);
  }

  getAppKey(): string {
    return localStorage.getItem(ClientStorageKeyName.appKey);
  }

  setAppToken(value) {
    localStorage.setItem(ClientStorageKeyName.appToken, value);
  }

  getAppToken(): string {
    return localStorage.getItem(ClientStorageKeyName.appToken);
  }
}
