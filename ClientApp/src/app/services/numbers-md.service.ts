import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumbersMDService {
  constructor(private http: HttpClient) {}
  url = 'https://sw02660.global.hvwan.net/telsorcore/api/numbers/';

  getNumbersMD() {
    return this.http.get(this.url);
  }
  getNumber(id: any) {
    return this.http.get(this.url + id);
  }
  updateNumber(id: number, numberMasterData: any) {
    return this.http.put(this.url + id, numberMasterData);
  }
  createNumber(numberMasterData: any) {
    return this.http.post(this.url, numberMasterData);
  }
  deleteNumber(id: number) {
    return this.http.delete(this.url + id);
  }
}
