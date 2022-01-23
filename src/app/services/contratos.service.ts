import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NavController} from "@ionic/angular";
import {map, Observable} from "rxjs";
import {ContratoI} from "../interfaces/contratos/contrato.interface";

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  // region Atributos
  public dashURL: string;
  public profile: any;
  public globalURL = environment.globalUrl;

  // endregion

  // region Constructor
  constructor(
    public httpClient: HttpClient,
    public navCtrl: NavController
  ) {
    this.dashURL = environment.dashUrl;
  }

  // endregion

  public saveProgress(_payload): Observable<any> {
    return this.httpClient.post<any>(`${this.dashURL}/contratos/save-progress`, _payload).pipe(map(response => {
      return response;
    }));
  }


  public getContractData(_id): Observable<any> {
    return this.httpClient.get<any>(`${this.dashURL}/contratos/${_id}`).pipe(map(response => {
      return response;
    }));
  }

  public getContractNumber(): string {
    const _data = localStorage.getItem('num_contrato');
    if (_data != 'undefined') {
      return _data;
    } else {
      return null;
    }
  }

  public setContractData(num_contrato) {
    localStorage.setItem('num_contrato', num_contrato);
  }

  public flushContractData() {
    localStorage.removeItem('num_contrato');
  }
}
