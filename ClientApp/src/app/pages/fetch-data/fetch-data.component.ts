import { FilesService } from '../../services/files.service';
import { DepartmentsService } from '../../services/departments.service';
import { NumbersMDService } from '../../services/numbers-md.service';
import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import * as XLSX from 'xlsx';
import { removeDiacritics, removeSpaces } from '../../helpers/helper-functions';
interface Date {
  year: string;
  month: string;
}
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
})
export class FetchDataComponent {
  //date for filtering
  date: Date = {
    year: '',
    month: '',
  };
  //raw data from import
  data: any[] = [];
  //numbers from master data
  numbersMD: any[] = [];
  //data after asigning of departments
  asignedDepartmetns: any[] = [];
  //table for refreshing value
  asignedDepartmetnsMD: any[] = [];
  //departments with summary of dph and noDph prices
  summaryOfDepartments: any[] = [];
  //list of numbers for selected dep
  selectedDep: any[] = [];
  //master data of departments
  departments: any[] = [];
  //total sum of invice with DPH
  sumPrice: any;
  //search field input
  input: any;
  //filter object for views
  filter = {
    type: 'vypis',
  };
  invoiceNumber = '';
  invoices: string[] = [];

  //trigger export view table
  export = false;
  //trigger value for table view
  view = false;
  //trigger single department records view
  singleView = false;
  //shows copied
  copied = false;
  isCheck = true;

  constructor(
    private service: NumbersMDService,
    private departmentService: DepartmentsService,
    private filesService: FilesService,
    private clipboard: Clipboard
  ) {}

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

  isChecked() {
    this.isCheck = true;
  }
  //asign records to departments if phone nubmer has department asigned in master data if there is no md department is 0 = unasigned
  assignDepartment(input: any) {
    console.log(input);
    let numberFromMasterData: any = {};
    let asignedDep: any = {};
    this.service.getNumbersMD().subscribe((r: any) => {
      numberFromMasterData = this.numbersMD.find(
        (n) => n.phone == input.Cislosluzby
      );
      if (numberFromMasterData) {
        asignedDep = {
          number: input.Cislosluzby,
          name: input.Pojmenovanisluzby,
          noDph: input.CenabezDPH,
          dph: input.CenasDPH,
          departmentId: numberFromMasterData.departmentId,
          invoice: input.Cislofaktury,
          service: input.Sluzbytretichstran,
        };
        if (asignedDep.service) {
          asignedDep.noDph = asignedDep.noDph - asignedDep.service;
        }
      } else {
        asignedDep = {
          number: input.Cislosluzby,
          name: input.Pojmenovanisluzby,
          noDph: input.CenabezDPH,
          dph: input.CenasDPH,
          departmentId: 1,
          invoice: input.Cislofaktury,
          service: input.Sluzbytretichstran,
        };
        if (asignedDep.service) {
          asignedDep.noDph = asignedDep.noDph - asignedDep.service;
        }
      }
      this.asignedDepartmetns.push(asignedDep);
    });
    this.asignedDepartmetnsMD = this.asignedDepartmetns;
    console.log(this.asignedDepartmetns);
  }
  //summary of asigned departments for dph and noDph values and total summary of import
  sumUpDepartments() {
    this.departmentService.getDepartments().subscribe((r: any) => {
      this.departments = r;
      this.service.getNumbersMD().subscribe((r: any) => {
        this.numbersMD = r;
        for (let d of this.departments) {
          let separatedDepartments = this.asignedDepartmetns.filter(
            (r) => r.departmentId == d.id
          );
          let summaryDph = separatedDepartments.reduce(
            (ac: any, price: { dph: any }) => {
              return ac + price.dph;
            },
            0
          );
          let summaryNoDph = separatedDepartments.reduce(
            (ac: any, price: { noDph: any }) => {
              return ac + price.noDph;
            },
            0
          );
          let dep = {
            name: d.name,
            code: d.depNumber,
            dph: summaryDph,
            noDph: summaryNoDph,
            depId: d.id,
          };
          this.summaryOfDepartments.push(dep);
        }
        this.sumPrice =
          Math.round(
            this.totalSum(this.summaryOfDepartments) * 100 + Number.EPSILON
          ) / 100;
      });
    });
  }
  //count total price of input
  totalSum(input: any) {
    let summary = input.reduce((ac: any, price: { noDph: number }) => {
      return ac + price.noDph;
    }, 0);
    return summary;
  }
  //switch of table view (raw data/departments overview)
  viewSwitch() {
    this.view = !this.view;
  }
  //populate table with records for single dep
  singleDep(d: any) {
    this.selectedDep = [];
    this.selectedDep = this.asignedDepartmetns.filter(
      (r) => r.departmentId == d.depId
    );
    this.singleView = true;
  }
  //switch view back from single dep view
  back() {
    this.singleView = false;
  }
  //switch to export view
  exportView() {
    this.export = !this.export;
  }
  //filter provided table regarding input value/text
  filterAndSearch(table: any) {
    let result = [];
    this.asignedDepartmetns = this.asignedDepartmetnsMD;
    if (this.input.toString() != '') {
      for (let r of table) {
        let props = Object.keys(r);
        for (let propertie of props)
          if (
            r[propertie]
              ?.toString()
              .toUpperCase()
              .includes(this.input.toUpperCase())
          )
            result.push(r);
      }
      this.asignedDepartmetns = result;
    }
  }
  copyToClipboard() {
    const table = document.getElementById('export') as HTMLTableElement;
    const tableHtml = table.outerHTML;
    this.clipboard.copy(tableHtml);
    this.copied = true;
  }
  getInvoiceNumbers(data: any) {
    this.invoices = [];
    for (let i of data)
      if (!this.invoices.includes(i.Cislofaktury))
        this.invoices.push(i.Cislofaktury);
  }
}
