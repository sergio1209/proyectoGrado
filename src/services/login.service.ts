import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user.interface';
import {debounceTime} from 'rxjs/operators';
import {HttpGenericService} from './base/http-generic.service';
import {Router} from '@angular/router';
import jwtDecode from 'jwt-decode';

const cleaning = {username: '', name: '', surname: '', rol: '', password: '' };

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private storage: User = sessionStorage.getItem('session') !== null ?
    JSON.parse(sessionStorage.getItem('session')) :
    cleaning;

  private $session = new BehaviorSubject(this.storage);
  private session = this.$session.asObservable();

  private errorEmiter = new EventEmitter<string>();

  constructor(
    private http: HttpGenericService<User>,
    private router: Router,
  ) {

    this.session.pipe(
      debounceTime(500)
    ).subscribe(resp => {
      if(resp.username.length > 0 && resp.password.length > 0 ) {
        this.http.post('users/signin', resp).subscribe((response: any )=> {
          sessionStorage.setItem('session', JSON.stringify({...response, username: resp.username, password: ''}));
          const data: any = jwtDecode(response.access_token);
          switch ((data.rol + '').toUpperCase()) {
            case 'PACIENTE': this.router.navigateByUrl('/home'); break;
            case 'ADMIN': this.router.navigateByUrl('/home'); break;
            case 'DOCTOR': this.router.navigateByUrl('/home'); break;
          }
        }, error => {
          this.errorEmiter.emit('El nombre de usuario o contraseña son incorrectos, por favor verifique que la información.');
        });
      } else {
        sessionStorage.removeItem('session');
      }
    });

  }

  public getSession() {
    return this.session;
  }

  public getErrors() {
    return this.errorEmiter.asObservable();
  }

  public up(user: User) {
    this.$session.next(user);
  }

  public down() {
    this.$session.next(cleaning);
  }
}
