import { Observable } from 'rxjs';
import { Albergue } from '../models/albergue.model';
import { Entidade } from '../models/entidade.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../app.api'

@Injectable({
  providedIn: 'root'
})
export class EntidadeService {

  private readonly ALBERGUE = 'ALBERGUE';
  private readonly INSTITUICAO = 'INSTITUICAO';

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  // ----------------------------------------------------
  // Entidade (Albergue ou Instituicao)
  createEntidade(tipo: string, entidade: any){
    if(tipo === "albergue"){
    return this.createAlbergue(entidade);
    } else {
      return this.createInstituicao(entidade);
    }
  }

  findEntidade(tipo: string){
    if(tipo === "albergue"){
      return this.findAlbergues()
    } else {
      return this.findInstituicoes();
    }
  }

  solicitarEntidade(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.solicitarAlbergue(id)
    } else {
      return this.solicitarInstituicao(id);
    }
  }

  getEntidade(tipo: string){
    if(tipo === "albergue"){
      return this.getAlbergue()
    } else {
      return this.getInstituicao();
    }
  }

  aprovarEntidade(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.aprovarAlbergue(id)
    } else {
      return this.aprovarInstituicao(id);
    }
  }

  storeEntidade(tipo: string, entidade: any){
    if(tipo === "albergue"){
      return this.storeAlbergue(entidade);
    } else {
      return this.storeInstituicao(entidade);
    }
  }

  // ----------------------------------------------------
  // Albergue
  createAlbergue(albergue: Albergue){
    return this._http.post(`${API}/api/abrigo`, albergue);
  }

  findAlbergues(){
    return this._http.get(`${API}/api/abrigo`);
  }

  solicitarAlbergue(id: number){
    return this._http.patch(`${API}/api/abrigo/solicitar`, {abrigo_id: id})
  }

  getAlbergue() {
    return JSON.parse(localStorage.getItem(this.ALBERGUE));
  }

  aprovarAlbergue(id: number){
    return this._http.patch(`${API}/api/abrigo/aprovar`, {abrigo_id: id})
  }

  storeAlbergue(albergue: Albergue) {
    localStorage.setItem(this.ALBERGUE, JSON.stringify(albergue));
  }

  removeAlbergue() {
    localStorage.removeItem(this.ALBERGUE);
  }

  // ----------------------------------------------------
  // Instituicao
  createInstituicao(instituicao: Entidade) {
    return this._http.post(`${API}/api/instituicoes`, instituicao);
  }

  findInstituicoes() {
    return this._http.get(`${API}/api/instituicoes`);
  }

  solicitarInstituicao(id: number){
    return this._http.patch(`${API}/api/instituicoes/solicitar`, {instituicao_id: id})
  }

  getInstituicao() {
    return JSON.parse(localStorage.getItem(this.INSTITUICAO));
  }

  aprovarInstituicao(id: number){
    return this._http.patch(`${API}/api/instituicoes/aprovar`, {id: id})
  }

  storeInstituicao(instituicao: Entidade) {
    localStorage.setItem(this.INSTITUICAO, JSON.stringify(instituicao));
  }

  removeInstituicao() {
    localStorage.removeItem(this.INSTITUICAO);
  }

  // ----------------------------------------------------
  // Storage

  removeAll(){
    this.removeAlbergue();
    this.removeInstituicao();
  }
}
