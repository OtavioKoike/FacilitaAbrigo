import { Estadia } from './../models/estadia.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// API
import { API } from '../../../app.api'
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EstadiaService {

  constructor( private _http: HttpClient ) { }

  // createEstadia(abrigado: Abrigado){
  //   return this._http.post(`${API}/api/abrigado`, abrigado)
  // }

  findEstadias(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.findEstadiasAlbergue(id)
    } else {
      return this.findEstadiasInstituicoes(id);
    }
  }

  findEstadiasAlbergue(id: number) {
    return this._http.get<Estadia[]>(`${API}/api/estadia?abrigo_id=${id}`);
  }

  findEstadiasInstituicoes(id: number) {
    return this._http.get<Estadia[]>(`${API}/api/estadia?instituicao_id=${id}`);
  }


  findEstadiaById(id: number) {
    return this._http.get<Estadia>(`${API}/api/estadia/${id}`);
  }

  updateEstadia(estadia: Estadia){
    return this._http.put(`${API}/api/estadia/${estadia.id}`, {data_saida: estadia.data_saida})
  }

  createEvento(id: number, evento: string){
    return this._http.post(`${API}/api/estadia/${id}/evento`, {descricao: evento})
  }

  deleteEvento(evento: Evento){
    return this._http.delete(`${API}/api/estadia/evento/${evento.id}`);
  }
}
