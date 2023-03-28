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
    nubmer: '',
  };

  constructor(
    private active: ActivatedRoute,
    private mdService: NumbersMDService
  ) {}
  ngOnInit(): void {
    this.active.paramMap.subscribe((params: any) => {
      this.id = params.get('id?');
      if (this.id != 0) {
        this.mdService
          .getNumber(this.id)
          .subscribe((d: any) => (this.record = d));
      }
    });
  }
}
