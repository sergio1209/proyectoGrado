import { getLocaleExtraDayPeriods } from "@angular/common";
import { HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { BehaviorSubject, Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { Appointment } from "src/models/appointment.interface";
import { HttpGenericService } from "./base/http-generic.service";
import { LoaderService } from "./loader.service";

@Injectable({
    providedIn:'root'
})
export class AppointmentService {

    private _appointmentSave = new Subject<Appointment>();

private _listAppointment = new Subject<Appointment[]>();
    private storageAppointment = new BehaviorSubject({ data: [], count: 0 });
    private _keyword = new BehaviorSubject('');
    private _searchAppointment = new Subject<number>();
  
    public listAppointments  = this._listAppointment.asObservable();
    public infinite = this.storageAppointment.asObservable();
    public keyword = this._keyword.asObservable();
    constructor(
        private http: HttpGenericService<Appointment>,
        private loaderSvc: LoaderService
    ) {
        this.getAllAppointments();
        this.validarAppointment();
        this.searched();
        
        this.save();
    }

    private save() {
        this._appointmentSave.pipe(
            debounceTime(500),
            tap(() => { this.loaderSvc.loading('Enviando los datos de la cita'); })
        ).subscribe(resp => {
            this.http.post('Appointment', resp).subscribe(async (resp )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendMessage('La cita fue guardada correctamente');
            }, async (err )=> {
                await this.loaderSvc.loaderDismiss();
                this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
            })
        });
    }

    up(data: Appointment) {
        this._appointmentSave.next(data);
    }
    private validarAppointment() {
        this._searchAppointment.pipe(
          debounceTime(500),
          tap(() => { this.loaderSvc.loading('Buscando cita'); })
        ).subscribe(resp => {
          this.http.get('Appointment/'+ resp).subscribe(async (resp: any) => {
            await this.loaderSvc.loaderDismiss();
            this.loaderSvc.sendMessage(resp.message);
          }, async (err )=> {
            await this.loaderSvc.loaderDismiss();
            this.loaderSvc.sendError('Ocurrio un error realizando esta operación');
          });
        });
      }
    
      private searched() {
        this._keyword.pipe(
          debounceTime(100)
        ).subscribe(resp => {
          this.getAllAppointments(1, resp);
        });
      }
    
      public getAllAppointments(page: number = 0, keyword = '') {
        const params = new HttpParams({
          fromObject: {
            page,
            keyword
          }
        });
        this.http.get('Appointment', { params }).subscribe((resp: any) => {
          this.storageAppointment.next(resp);
        });
      }
    
      search(id: number) {
        this._searchAppointment.next(id);
      }
    
      searchByKeyword(keyword: string){
        this._keyword.next(keyword);
      }
}