import { Component, OnInit } from '@angular/core';
import {Patient} from '../../../../models/patient.interface';
import {PatientService} from '../../../../services/patient.service';
import {User} from '../../../../models/user.interface';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {

  listUsers = [] as User[];
  private page = 2;
  keyword = '';
  constructor(
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.userSvc.keyword.subscribe(resp => {
      this.keyword = resp;
    });
    this.userSvc.infinite.subscribe((resp: any) => {
      if(this.page === 2) {
        this.listUsers = [ ...[], ...resp.data];
      } else {
        this.listUsers = [ ...this.listUsers, ...resp.data];
      }
    });
  }


  loadData($event) {
    this.userSvc.getAllUser(this.page,  this.keyword);
    $event.target.complete();
    this.page++;
  }

  search(value: string) {
    this.page = 2;
    this.userSvc.searchByKeyword(value);
  }
}
