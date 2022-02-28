import { EventEmitter, Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
  })
  export class LoaderService {
  
    private _loader = new EventEmitter<string>();
    private _errors = new EventEmitter<string>();
    private _messages = new EventEmitter<string>();
  
    private loader: HTMLIonLoadingElement;
    private alert: HTMLIonAlertElement;
    private alertErr: HTMLIonAlertElement;
  
    constructor(
      private LdController: LoadingController,
      private altController: AlertController
    ) {
      this.loaderEvent();
      this.errorEvent();
      this.messageEvent();
    }
  
    /**
     * 
     * @param value  send value from message
     */
    public sendMessage(value: string) {
      this._messages.next(value);
    }
  
    public sendError(value: string) {
      this._errors.next(value);
    }
  
    public loading(value = 'Procesando') {
      this._loader.next(value);    
    }
    
    private loaderEvent() {
      this._loader.subscribe(async (resp) => {
        this.loader = await this.LdController.create({
          spinner: 'circles',
          message: resp,
          mode: 'ios'
        })
        await this.loader.present();
      })
    }
  
    private errorEvent() {
      this._errors.subscribe(async (resp) => {
          this.alertErr = await this.altController.create({
              header: 'Error',
              buttons: ['Ok'],
              message: resp,
              animated: true,
              mode: 'ios',
          });
          await this.alertErr.present();
      })
    }
  
    private messageEvent() {
      this._messages.subscribe(async (resp) => {
          this.alert = await this.altController.create({
              header: 'Mensaje',
              buttons: ['Ok'],
              message: resp,
              animated: true,
              mode: 'ios',
          });
          await this.alert.present();
      })
    }
  
    public async loaderDismiss() {
      await this.loader.dismiss();
    }
  
    public async alertDismiss() {
      await this.alert.dismiss();
    }
  
  }
  