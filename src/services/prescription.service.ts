import { Injectable } from "@angular/core";
import { Prescription } from "src/models/prescription.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
})
export class PrescriptionService extends HttpGenericService<Prescription>{}