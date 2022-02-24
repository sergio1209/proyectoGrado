import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/services/user.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public header = 'Header';

  constructor(
    private service: UserService) {
  }

  ngOnInit(): void {

  }

  onRouterOutletActivate(event: any) {
    this.header = event.header;

  }

}
