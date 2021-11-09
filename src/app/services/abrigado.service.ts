import { Abrigado } from './../models/abrigado.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// API
import { API } from '../../../app.api'

@Injectable({
  providedIn: 'root'
})
export class AbrigadoService {

  constructor(
    private _http: HttpClient,
  ) { }

  createAbrigado(abrigado: Abrigado){
    return this._http.post(`${API}/api/abrigado`, abrigado)
  }

  findAbrigados() {
    return this._http.get<Abrigado[]>(`${API}/api/abrigado`);
  }

  findAbrigadobyPk(id: number) {
    return this._http.get<Abrigado>(`${API}/api/abrigado/${id}`);
  }

  updateAbrigado(abrigado: Abrigado){
    return this._http.put(`${API}/api/abrigado/${abrigado.id}`, abrigado)
  }

}
