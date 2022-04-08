import { Component, OnInit } from '@angular/core';
import {Diary} from "../../../../models/diary.interface";
import {DiaryService} from "../../../../services/diary.service";


@Component({
  selector: 'app-list-diary',
  templateUrl: './list-diary.component.html',
  styleUrls: ['./list-diary.component.scss'],
})
export class ListDiaryComponent implements OnInit {

  listDiary= [] as Diary[];
  private page = 2;
  keyword = '';
  constructor(
    private diarySvc: DiaryService
  ) { }

  ngOnInit() {
    this.diarySvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.diarySvc.infinite.subscribe((resp: any) => {
      if(this.page === 2) {
        this.listDiary = [ ...[], ...resp.data];
      } else {
        this.listDiary = [ ...this.listDiary, ...resp.data];
      }
    });
  }


  loadData($event) {
    this.diarySvc.getAllDiarys(this.page,  this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.diarySvc.searchByKeyword(value);
  }

}
