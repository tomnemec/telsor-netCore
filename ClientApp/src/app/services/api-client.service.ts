import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  DOMAIN = 'https://localhost:7129/api/';
  constructor(private http: HttpClient) {}

  getAll<T>(url: string) {
    return this.http.get<T>(this.DOMAIN + url);
  }
}
