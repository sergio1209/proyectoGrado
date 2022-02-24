import { Injectable } from "@angular/core";
import { ClinicHistory } from "src/models/clinicHistory.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
})
export class ClinicHistoryService extends HttpGenericService<ClinicHistory>{}