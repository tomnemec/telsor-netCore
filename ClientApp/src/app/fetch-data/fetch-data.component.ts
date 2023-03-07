import { FilesService } from './../services/files.service';
import { DepartmentsService } from './../services/departments.service';
import { NumbersMDService } from './../services/numbers-md.service';
import { Component, Inject } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  //raw data from import
  data: any[] = [];
  //numbers from master data
  numbersMD: any[] = [];
  //data after asigning of departments
  asignedDepartmetns: any[] = [];
  //departments with summary of dph and noDph prices
  summaryOfDepartments: any[] = [];
  //master data of departments
  departments: any[] = [];
  //total sum of invice with DPH
  sumPrice: any;

  //trigger value for table view
  view = false;

  constructor(private service: NumbersMDService, private departmentService: DepartmentsService,private filesService:FilesService) { }

  ngOnInit(): void {
    this.service.getNumbersMD()
      .subscribe((r: any) => this.numbersMD = r);

  }
  saveFile(input:any)
  {
    this.filesService.onFileSelected(input);
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
            const newKey = this.removeSpaces(this.removeDiacritics(key));
            newItem[newKey] = item[key];
          });
          return newItem;
        });
        return initial;
      }, {});
      this.data = jsonData;
    }
    reader.readAsBinaryString(file);
  }
  //button trigger
  onFileClick() {
    this.data = Object.values(this.data)[0];
    for (let n of this.data)
      this.assignDepartment(n);
    this.sumUpDepartments();
  }

  removeDiacritics(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  removeSpaces(str: string) {
    return str.replace(/\s/g, "");
  }

  //asign records to departments if phone nubmer has department asigned in master data if there is no md department is 0 = unasigned
  assignDepartment(input: any) {
    let numberFromMasterData: any = {};
    let asignedDep: any = {};
    this.service.getNumbersMD()
      .subscribe((r: any) => {
        numberFromMasterData = this.numbersMD.find(n => n.phone == input.Cislosluzby);
        if (numberFromMasterData) {
          asignedDep = {
            number: input.Cislosluzby,
            name: input.Pojmenovanisluzby,
            noDph: input.CenabezDPH,
            dph: input.CenasDPH,
            departmentId: numberFromMasterData.departmentId
          }
        }
        else {
          asignedDep = {
            number: input.Cislosluzby,
            name: input.Pojmenovanisluzby,
            noDph: input.CenabezDPH,
            dph: input.CenasDPH,
            departmentId: 1
          }
        }
        this.asignedDepartmetns.push(asignedDep);
      });
  }

  //summary of asigned departments for dph and noDph values and total summary of import
  sumUpDepartments() {
    this.departmentService.getDepartments()
      .subscribe((r: any) => {
        this.departments = r;
        this.service.getNumbersMD()
          .subscribe((r: any) => {
            this.numbersMD = r;
            for (let d of this.departments) {
              let separatedDepartments = this.asignedDepartmetns.filter(r => r.departmentId == d.id);
              let summaryDph = separatedDepartments.reduce((ac: any, price: { dph: any }) => {
                return ac + price.dph
              }, 0);
              let summaryNoDph = separatedDepartments.reduce((ac: any, price: { noDph: any }) => {
                return ac + price.noDph
              }, 0);
              let dep = {
                name: d.name,
                code:d.depNumber,
                dph: summaryDph,
                noDph: summaryNoDph
              };
              this.summaryOfDepartments.push(dep);
            }
            this.sumPrice =Math.round( this.totalSum(this.summaryOfDepartments) * 100 + Number.EPSILON ) / 100;
          });
      });
  }
  totalSum(input: any) {
    let summary = input.reduce((ac: any, price: { dph: number }) => {
      return ac + price.dph
    }, 0);
    return summary;
  }

  //switch of table view (raw data/departments overview)
  viewSwitch() {
    this.view = !this.view;
  }
}