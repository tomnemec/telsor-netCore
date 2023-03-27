import { NumbersMDService } from './../services/numbers-md.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent {
  masterData: any;
  input: any;
  filteredData: any;

  constructor(private dataService: NumbersMDService) {}

  ngOnInit(): void {
    this.dataService.getNumbersMD().subscribe((r: any) => {
      this.masterData = r;
      this.filteredData = r;
    });
  }
  search() {
    let result = [];
    this.filteredData = this.masterData;
    if (this.input.toString() != '') {
      for (let r of this.masterData) {
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
      this.filteredData = result;
    }
  }
}
