import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Record {
  id: number;
  name: string;
  description: string;
  status: string;
  created: Date;
  updated: Date;
  minutes: number;
  messages: number;
  data: number;
}
@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private http: HttpClient) {}

  getRecords() {
    const records: Record[] = [];
    this.http
      .get<Record[]>(
        'https://sw02660.global.hvwan.net/telsorcore/api/departments'
      )
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
  createRecord(record: Record) {
    this.http
      .post(
        'https://sw02660.global.hvwan.net/telsorcore/api/departments',
        record
      )
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
