import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ophthalmologist } from "src/models/ophthalmologist.interface";
import { User } from "src/models/user.interface";
import { HttpGenericService } from "./base/http-generic.service";


@Injectable({
    providedIn:'root'
})
export class OphthalmologistService {
    private _ophthalmologist= new Subject<Ophthalmologist>();
    private _errors= new EventEmitter<String>();
    constructor(
        private http: HttpGenericService<Ophthalmologist>
    ){}

    getE
}