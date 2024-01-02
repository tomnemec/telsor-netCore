import { Component } from '@angular/core';
import { FilesService } from './../services/files.service';
import { removeDiacritics, removeSpaces } from '../helpers/helper-functions';
import { DepartmentsService } from './../services/departments.service';
import { NumberMD, NumbersMDService } from './../services/numbers-md.service';
import { Clipboard } from '@angular/cdk/clipboard';
import * as XLSX from 'xlsx';

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
  ngOnInit(): void {
    this.service.getNumbersMD().subscribe((r: any) => (this.numbersMD = r));
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
    this.summaryOfDepartments = [];
    this.asignedDepartmetns = [];
    this.data = Object.values(this.data)[0];
    this.data = this.data.filter((r) => r.Cislofaktury == this.invoiceNumber);
    for (let n of this.data) {
      this.assignDepartment(n);
    }
    this.getInvoiceNumbers(this.data);
    this.sumUpDepartments();
  }
}
