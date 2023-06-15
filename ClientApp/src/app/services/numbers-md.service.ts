import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumbersMDService {
  constructor(private http: HttpClient) {}

  getNumbersMD() {
    return this.http.get(
      'https://sw02660.global.hvwan.net/telsorcore/api/numbers'
    );
  }
  getNumber(id: any) {
    return this.http.get(
      'https://sw02660.global.hvwan.net/telsorcore/api/numbers/' + id
    );
  }
  updateNumber(id: number, numberMasterData: any) {
    return this.http.put(
      'https://sw02660.global.hvwan.net/telsorcore/api/numbers/' + id,
      numberMasterData
    );
  }
  createNumber(numberMasterData: any) {
    return this.http.post(
      'https://sw02660.global.hvwan.net/telsorcore/api/numbers/',
      numberMasterData
    );
  }
  deleteNumber(id: number) {
    return this.http.delete(
      'https://sw02660.global.hvwan.net/telsorcore/api/numbers/' + id
    );
  }
}
