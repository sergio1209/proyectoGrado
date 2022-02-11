import { Injectable } from "@angular/core";
import { Patient } from "src/models/patient.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
})
export class PatientService extends HttpGenericService<Patient>{}