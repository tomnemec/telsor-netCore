import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Record {
  id: number;
  date: string;
  name: string;
  phoneNumber: number;
  value: number;
  noDph: number;
  dph: number;
  departmentId: number;
  type: string;
  description: string;
}
@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private http: HttpClient) {}

  getRecords() {
    const records: Record[] = [];
    this.http
      .get<Record[]>('https://sw02660.global.hvwan.net/telsorcore/api/records')
      .subscribe({
        next: (data: Record[]) => {
          records.push(...data);
        },
        complete: () => {
          return records;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
  postRecords(records: Record[]) {
    this.http
      .post('https://sw02660.global.hvwan.net/telsorcore/api/records', records)
      .subscribe({
        next: (data) => {
          console.log('Data: ', data);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }
}
