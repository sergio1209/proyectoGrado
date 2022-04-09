import { Component, OnInit } from '@angular/core';
import { ClinicHistory } from 'src/models/clinicHistory.interface';
import { ClinicHistoryService } from 'src/services/clinicHistory.service';

@Component({
  selector: 'app-list-clinc-history',
  templateUrl: './list-clinc-history.component.html',
  styleUrls: ['./list-clinc-history.component.scss'],
})
export class ListClincHistoryComponent implements OnInit {

  listClinicHistorys = [] as ClinicHistory[];
  private page = 2;
  keyword = '';
  constructor(
    private clinicHistorySvc: ClinicHistoryService
  ) { }

  ngOnInit() {
    this.clinicHistorySvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.clinicHistorySvc.infinite.subscribe((resp: any) => {
      if(this.page === 2) {
        this.listClinicHistorys = [ ...[], ...resp.data];
      } else {
        this.listClinicHistorys = [ ...this.listClinicHistorys, ...resp.data];
      }
    });
  }


  loadData($event) {
    this.clinicHistorySvc.getAllClinicHistorys(this.page,  this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.clinicHistorySvc.searchByKeyword(value);
  }

}
