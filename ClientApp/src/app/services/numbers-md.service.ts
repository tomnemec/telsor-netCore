import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumbersMDService {

  constructor(private http:HttpClient) { }
  numbersMD=[
    {
      number:601052999,
      name:"Karel",
      department:1
    },
    {
      number:601062161,
      name:"Marek",      
      department:2
    }
    ,
    {
      number:601083719,
      name:"Anton",      
      department:3
    }
    ,
    {
      number:11111111,
      name:"test",      
      department:3
    },
    {
      number:122221,
      name:"test2",      
      department:3
    }
  ]
  
  getNumbersMD()
  {
    return this.http.get('https://localhost:7129/api/numbers');
  }
}
