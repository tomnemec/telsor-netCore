import { Component } from '@angular/core';
import { FilesService } from './../services/files.service';
import { removeDiacritics, removeSpaces } from '../helpers/helper-functions';
import { DepartmentsService } from './../services/departments.service';
import { NumberMD, NumbersMDService } from './../services/numbers-md.service';
import { Clipboard } from '@angular/cdk/clipboard';
import * as XLSX from 'xlsx';
import { Record } from '../services/records.service';
import { Department } from '../services/departments.service';

interface Filter {
  type: string;
  departmentId: number;
}
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  constructor(
    private service: NumbersMDService,
    private departmentService: DepartmentsService,
    private clipboard: Clipboard
  ) {}
  //raw data from import
  data: any[] = [];
  //numbers from master data
  numbersMD: NumberMD[] = [];
  originData: Record[] = [];
  asignedDepartments: Record[] = [];
  departments: Department[] = [];
  filter = { type: 'all', departmentId: 1 };
  ngOnInit(): void {
    this.service.getNumbersMD().subscribe((r: any) => (this.numbersMD = r));
    this.departmentService.getDepartments().subscribe((r: any) => {
      this.departments = r;
    });
  }
  //takes excel file and loads all rows with properties names set according column names
  onFileChange(event: any) {
    let workBook: XLSX.WorkBook;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet).map((item: any) => {
          const newItem: any = {};
          Object.keys(item).forEach((key) => {
            const newKey = removeSpaces(removeDiacritics(key));
            newItem[newKey] = item[key];
          });
          return newItem;
        });
        return initial;
      }, {});
      this.data = jsonData;
    };
    reader.readAsBinaryString(file);
  }
  //button trigger
  onFileClick() {
    this.data = Object.values(this.data)[0];
    for (let n of this.data) {
      this.assignDepartment(n);
    }
    console.log(this.asignedDepartments);
  }
  assignDepartment(input: any) {
    let numberFromMasterData: any = {};
    let asignedDep: any = {};
    this.service.getNumbersMD().subscribe((r: any) => {
      numberFromMasterData = this.numbersMD.find(
        (n) => n.phone == input.Cislosluzby
      );
      if (numberFromMasterData) {
        asignedDep = {
          phoneNumber: input.Cislosluzby,
          name: input.Pojmenovanisluzby,
          noDph: input.CenaKcbezDPH,
          dph: input.CenasDPH,
          departmentId: numberFromMasterData.departmentId,
          invoice: input.Cislofaktury,
          type: input.Podsekce,
          description: input.Sekce,
          value: input.Pocet,
        };
        if (asignedDep.service) {
          asignedDep.noDph = asignedDep.noDph - asignedDep.service;
        }
      } else {
        asignedDep = {
          phoneNumber: input.Cislosluzby,
          name: input.Pojmenovanisluzby,
          noDph: input.CenaKcbezDPH,
          dph: input.CenasDPH,
          departmentId: 1,
          invoice: input.Cislofaktury,
          type: input.Podsekce,
          description: input.Sekce,
          value: input.Pocet,
        };
        if (asignedDep.service) {
          asignedDep.noDph = asignedDep.noDph - asignedDep.service;
        }
      }
      this.originData.push(asignedDep);
      this.asignedDepartments.push(asignedDep);
    });
  }
  setFilter(filter: Filter) {
    if (!filter.type) {
      this.filter.type = filter.type;
    }
    this.filterData();
  }
  filterData() {
    console.log(this.filter);
    if (this.filter.type == 'all') {
      this.asignedDepartments = this.originData;
    } else {
      this.asignedDepartments = this.originData.filter(
        (r) => r.type == this.filter.type
      );
    }
  }
}
