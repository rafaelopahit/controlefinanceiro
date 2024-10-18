import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService extends MainService {




  constructor(protected http: HttpClient) {

    super();

  }


  saveLancamento(data: any) {
    return this.http.post(this.domain + "/values/insertdata", data);
  }



  getData() {
    return this.http.get(this.domain + "/values/list");
  }

  getById(id: any) {
    return this.http.get(this.domain + "/values/getbyid/" + id);
  }

  delete(id: any) {
    return this.http.get(this.domain + "/values/delete/" + id);
  }

  getReport(data: any) {
    return this.http.post(this.domain + "/report/generatedata", data);
  }
}
