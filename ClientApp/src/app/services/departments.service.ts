import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Department {
  id: number;
  name: string;
  depNumber: string;
}
@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get(
      'https://sw02660.global.hvwan.net/telsorcore/api/departments'
    );
  }
}
