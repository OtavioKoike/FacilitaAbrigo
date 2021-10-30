import { Caracteristica } from './../models/caracteristica.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from '../../../app.api'

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  constructor( private _http: HttpClient ) { }

  create(caracteristica: string){
    return this._http.post(`${API}/api/caracteristica`, {nome: caracteristica})
  }

  find(){
    return this._http.get(`${API}/api/caracteristica`) as Observable<Caracteristica[]>;
  }

  delete(id: number){
    return this._http.delete(`${API}/api/caracteristica/${id}`) as Observable<Caracteristica[]>;
  }
}
