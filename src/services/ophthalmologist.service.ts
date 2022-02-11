import { Injectable } from "@angular/core";
import { Ophthalmologist } from "src/models/ophthalmologist.interface";
import { User } from "src/models/user.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
})
export class OphthalmologistService extends HttpGenericService<Ophthalmologist>{}