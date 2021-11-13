import { HttpRequest } from '@angular/common/http';
import { HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quarto } from './../models/quarto.model';
import { Estadia } from './../models/estadia.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// API
import { API } from '../../../app.api'

@Injectable({
  providedIn: 'root'
})
export class QuartoService {

  constructor( private _http: HttpClient ) { }

  create(quarto: Quarto){
    return this._http.post<Quarto>(`${API}/api/quartos`, quarto);
  }

  update(quarto: Quarto){
    return this._http.put(`${API}/api/quartos/${quarto.id}`, quarto);
  }

  filtrar(data_inicial: string, data_final: string, cidade: string, caracteristicasIds: number[]){
    return this._http.get<Quarto[]>(`${API}/api/quartos/filtrar?data_inicial=${data_inicial}&cidade=${cidade}&caracteristicas=${caracteristicasIds.toString()}`);
  }

  filtrarByAbrigo(data_inicial: string, data_final: string, abrigo_id: number, caracteristicasIds: number[]){
    return this._http.get<Quarto[]>(`${API}/api/quartos/filtrar?data_inicial==${data_inicial}&caracteristicas=${caracteristicasIds.toString()}&abrigo_id=${abrigo_id}`);
  }

  delete(id: number){
    return this._http.delete(`${API}/api/quartos/${id}`);
  }

  addCaracteristicas(quarto: Quarto, caracteristicas: number[]){
    return this._http.post(`${API}/api/quartos/${quarto.id}/caracteristica`, {caracteristicas_ids: caracteristicas});
  }

  uploadFile(quarto: Quarto, file: File): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', `${API}/api/imagens?quarto_id=${quarto.id}`, formData, options);
    return this._http.request(req);
  }
}
