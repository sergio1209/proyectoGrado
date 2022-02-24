import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * T Representa el body que será procesado
 * */
export class HttpGenericService<T> {

  private readonly END_POINT: string;

  constructor(
    private readonly http: HttpClient
  ) {
    this.END_POINT = environment.BACKEND;
  }

  Get(route: string) {
    return this.http.get(`${this.END_POINT}/${route}`);
  }

  Post(route: string, body: T){
    return this.http.post(`${this.END_POINT}/${route}`, body);
  }

  Put(route: string, body: T) {
    return this.http.put(`${this.END_POINT}/${route}`, body);
  }

  Delete(route: string, id: number) {
    return this.http.delete(`${this.END_POINT}/${route}/${id}`);
  }
}