import { Component } from '@angular/core';
import { FilesService } from './../services/files.service';
import { removeDiacritics, removeSpaces } from '../helpers/helper-functions';
import { DepartmentsService } from './../services/departments.service';
import { NumberMD, NumbersMDService } from './../services/numbers-md.service';
import { Clipboard } from '@angular/cdk/clipboard';
import * as XLSX from 'xlsx';
import { Record } from '../services/records.service';
import { Department } from '../services/departments.service';

@Component({
  selector: 'app-asigner',
  templateUrl: './asigner.component.html',
  styleUrls: ['./asigner.component.css'],
})
export class AsignerComponent {
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
  asignedDepartments: any[] = [];
  departments: Department[] = [];
  filter = { type: 'all', departmentId: 1 };
  loading = false;

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
    //loading not works correctly
    this.loading = true;
    this.data = Object.values(this.data)[0];
    for (let n of this.data) {
      this.assignDepartment(n);
    }
    console.log(this.asignedDepartments);
    this.loading = false;
  }
  assignDepartment(input: any) {
    console.log(input);
    this.service.getNumbersMD().subscribe((r: any) => {
      this.numbersMD = r;
      let numberFromMasterData: any = {
        name: '',
        number: '',
        departmentId: 0,
      };
      let asignedDep: any = {};
      //find number from master data
      numberFromMasterData = this.numbersMD.find(
        (n: any) => n.phone == input.cn
      );
      if (!numberFromMasterData)
        numberFromMasterData = {
          name: 'nenalezen',
          phone: input.cn,
          departmentId: 1,
          id: 0,
          department: { id: 1, name: 'nenalezen' },
        };
      else {
        numberFromMasterData.department = this.departments.find(
          (d) => d.id == numberFromMasterData.departmentId
        );
      }
      //add input to asignedDepartments
      this.asignedDepartments.push(numberFromMasterData);
    });
  }
}
