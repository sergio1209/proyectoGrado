import { Injectable } from "@angular/core";
import { Diary } from "src/models/diary.interface";
import { HttpGenericService } from "./http-generic.service";

@Injectable({
    providedIn:'root'
})
export class DiaryService extends HttpGenericService<Diary>{}