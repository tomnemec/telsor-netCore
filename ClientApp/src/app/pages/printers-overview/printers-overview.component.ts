import { DepartmentsService } from './../../services/departments.service';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { removeDiacritics, removeSpaces } from '../../helpers/helper-functions';
import { ApiClientService } from 'src/app/services/api-client.service';
import { Date } from 'src/app/models/date';
import { DepartmentSummary } from 'src/app/models/departmentSummary';

@Component({
  selector: 'app-printers-overview',
  templateUrl: './printers-overview.component.html',
  styleUrls: ['./printers-overview.component.css'],
})
export class PrintersOverviewComponent {
  data: any[] = [];
  date: Date = {
    year: '',
    month: '',
  };
  departments: any[] = [];
  summaryForDepartmentsRents: DepartmentSummary[] = [];
  totalDeps: number = 0;
  constructor(
    private apiService: ApiClientService,
    private departmentsService: DepartmentsService
  ) {}
  ngOnInit() {}
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
    this.filterOutDepartments();
    this.summarizeRentsForDepartments();
    console.log(this.summaryForDepartmentsRents);
  }
  filterOutDepartments() {
    this.data.forEach((item: any) => {
      if (!this.departments.includes(item.Cisloexternihodokladu))
        this.departments.push(item.Cisloexternihodokladu);
    });
  }
  summarizeRentsForDepartments() {
    this.departments.forEach((department) => {
      let depRecords = this.data.filter(
        (item: any) => item.Cisloexternihodokladu === department
      );

      let total = depRecords.reduce((acc: any, item: any) => {
        console.log(item);
        if (!item.CelkovacenazavyrovnaniBW) item.CelkovacenazavyrovnaniBW = 0;
        if (!item.CelkovacenazavyrovnaniColor)
          item.CelkovacenazavyrovnaniColor = 0;
        acc += item.CelkovacenazavyrovnaniBW;
        acc += item.CelkovacenazavyrovnaniColor;
        return acc;
      }, 0); // Initialize acc with 0

      // Convert total to a numeric value
      total = parseFloat(total.toFixed(2)); // Adjust to the desired number of decimal places

      this.summaryForDepartmentsRents.push({
        depID: department,
        total: total,
        plant: '',
      });
      let totalDeps = this.summaryForDepartmentsRents.reduce(
        (acc: any, item: any) => {
          acc += item.total;
          return acc;
        },
        0
      );
      totalDeps = parseFloat(totalDeps.toFixed(2));
    });
  }
}
