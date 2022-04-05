import { Injectable } from '@angular/core';
import { User } from 'src/models/user.interface';
import { HttpGenericService } from './base/http-generic.service';
import {Subject} from 'rxjs';
import {LoaderService} from './loader.service';
import {debounceTime, tap} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class UserService {

  private _user = new Subject<User>();

  constructor(
    private http: HttpGenericService<User>,
    private loaderSvc: LoaderService
  ) {}

  private save() {
    this._user.pipe(
      debounceTime(500),
      tap(() => { this.loaderSvc.loading('Enviando datos de usuario.'); })
    ).subscribe(resp => {
      this.http.post('users/signup', resp).subscribe(async (resp) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendMessage('Usuario creado correctamente.');
      }, async (err) => {
        await this.loaderSvc.loaderDismiss();
        this.loaderSvc.sendError('Ocurrio un error realizando la operación');
      });
    });
  }

  up(data: User) {
    this._user.next(data);
  }
}
