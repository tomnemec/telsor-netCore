import { DepartmentsService } from './../services/departments.service';
import { NumbersMDService } from './../services/numbers-md.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-record',
  templateUrl: './single-record.component.html',
  styleUrls: ['./single-record.component.css'],
})
export class SingleRecordComponent {
  id = 0;
  record = {
    name: '',
    departmentId: 0,
    phone: '',
  };
  departments: any;
  currentDep: any;

  constructor(
    private active: ActivatedRoute,
    private mdService: NumbersMDService,
    private depsService: DepartmentsService
  ) {}
  ngOnInit(): void {
    this.active.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      if (this.id != 0) {
        this.mdService
          .getNumber(this.id)
          .subscribe((d: any) => (this.record = d));
      }
    });
    this.depsService.getDepartments().subscribe((d) => (this.departments = d));
  }
  save() {
    console.log(this.record);
  }
  getDep(id: number, departments: string[]) {
    let dep = departments.find((d: any) => d.id == id);
    return dep;
  }
}
