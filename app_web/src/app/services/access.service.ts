import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService extends MainService {

  constructor(protected http: HttpClient) {

    super();

  }


  login(data: any) {
    return this.http.post(this.domain + "/access/login", data);
  }

}
