import { Injectable } from "@angular/core";
import { Appointment } from "src/models/appointment.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
})
export class AppointmentService extends HttpGenericService<Appointment>{}