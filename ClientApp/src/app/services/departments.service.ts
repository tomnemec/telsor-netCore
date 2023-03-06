import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor() { }
  depertments=[
    {      
      name:"výroba",
      id:1
    },
    {      
      name:"finance",      
      id:2
    }
    ,
    {
      name:"kvalita",      
      id:3
    }
  ]

  getDepartments()
  {
    return this.depertments;
  }
}
