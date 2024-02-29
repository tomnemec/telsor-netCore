import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { removeDiacritics, removeSpaces } from '../../helpers/helper-functions';
@Component({
  selector: 'app-printers-overview',
  templateUrl: './printers-overview.component.html',
  styleUrls: ['./printers-overview.component.css'],
})
export class PrintersOverviewComponent {
  data: any[] = [];
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
    console.log(this.data);
  }
}
