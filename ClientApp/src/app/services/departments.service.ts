import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
