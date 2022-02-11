import { Injectable } from "@angular/core";
import { User } from "src/models/user.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
})
export class UserService extends HttpGenericService<User>{}