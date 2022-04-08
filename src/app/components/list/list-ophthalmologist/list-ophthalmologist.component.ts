import { Component, OnInit } from '@angular/core';
import { Ophthalmologist } from 'src/models/ophthalmologist.interface';
import { OphthalmologistService } from 'src/services/ophthalmologist.service';

@Component({
  selector: 'app-list-ophthalmologist',
  templateUrl: './list-ophthalmologist.component.html',
  styleUrls: ['./list-ophthalmologist.component.scss'],
})
export class ListOphthalmologistComponent implements OnInit {

  listOphthalmologists = [] as Ophthalmologist[];
  private page = 2;
  keyword = '';
  constructor(
    private ophthalmologistSvc: OphthalmologistService
  ) { }

  ngOnInit() {
    this.ophthalmologistSvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.ophthalmologistSvc.infinite.subscribe((resp: any) => {
      if(this.page === 2) {
        this.listOphthalmologists = [ ...[], ...resp.data];
      } else {
        this.listOphthalmologists = [ ...this.listOphthalmologists, ...resp.data];
      }
    });
  }


  loadData($event) {
    this.ophthalmologistSvc.getAllOphthalmologist(this.page,  this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.ophthalmologistSvc.searchByKeyword(value);
  }
}
