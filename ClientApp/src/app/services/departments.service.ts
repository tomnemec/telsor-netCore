import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http:HttpClient) { }
  
  getDepartments()
  {
    return this.http.get('https://localhost:7129/api/departments');
  }
}
