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

  loading = true;

  constructor(private dataService: NumbersMDService) {}

  ngOnInit(): void {
    this.dataService.getNumbersMD().subscribe({
      next: (r: any) => {
        this.masterData = r;
        this.filteredData = r;
      },
      complete: () => (this.loading = false),
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
  exportToTxt(dataArray: any[]) {
    // Create a string to store the formatted data
    let formattedData = '';

    // Iterate through each object in the array
    dataArray.forEach((obj) => {
      // Append the properties to the formatted string
      if (!obj.mobile) obj.mobile = '';
      if (!obj.phone) obj.phone = '';
      formattedData += `\t${obj.name}\t \t${obj.mobile}\t${obj.phone}\t \t \t \t \n`;
    });

    // Create a Blob containing the formatted data
    const blob = new Blob([formattedData], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute and create a URL for the Blob
    link.download = 'exported_data.txt';
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click on the link to initiate the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  }
}
