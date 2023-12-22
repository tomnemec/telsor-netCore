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

  getDepartments() {
    const records: Record[] = [];
    return this.http
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
}
