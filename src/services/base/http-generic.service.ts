import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpGenericService<T> {

  private backend = environment.BACKEND;

  constructor(
    private httpClient: HttpClient
  ) { }

  public get(url: string, options = {}) {
    return this.httpClient.get(this.backend + url, options);
  }

  public post(url: string, body: T, options = {}) {
    return this.httpClient.post(this.backend + url, body, options);
  }

  public put(url: string, body: T, options = {}) {
    return this.httpClient.post(this.backend + url, body, options);
  }

  public delete(url: string, options = {}) {
    return this.httpClient.delete(this.backend + url, options);
  }
}
