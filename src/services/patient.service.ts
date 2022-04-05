import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from 'src/models/patient.interface';
import { HttpGenericService } from './http-generic.service';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    public _data = new BehaviorSubject([] as Patient[]);
    public data = this._data.asObservable();

    constructor(
        private http: HttpGenericService<Patient>
    ) {
        this.http.Get('/patient').subscribe((resp: any) => {
            this._data.next(resp.data);

        });
    }
   

}