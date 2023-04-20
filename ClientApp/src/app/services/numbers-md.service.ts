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
  updateNumber(id: number, numberMasterData: any) {
    return this.http.put(
      'https://localhost:7129/api/numbers/' + id,
      numberMasterData
    );
  }
  createNumber(numberMasterData: any) {
    return this.http.post(
      'https://localhost:7129/api/numbers/',
      numberMasterData
    );
  }
  deleteNumber(id: number) {
    return this.http.delete('https://localhost:7129/api/numbers/' + id);
  }
}
