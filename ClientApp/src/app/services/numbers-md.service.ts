import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumbersMDService {
  constructor(private http: HttpClient) {}

  getNumbersMD() {
    return this.http.get('https://localhost:7129/api/numbers');
  }
  getNumber(id: any) {
    return this.http.get('https://localhost:7129/api/numbers/' + id);
  }
}
