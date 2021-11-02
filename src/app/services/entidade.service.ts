import { Albergue } from '../models/albergue.model';
import { Entidade } from '../models/entidade.model';
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

  findEntidades(tipo: string){
    if(tipo === "albergue"){
      return this.findAlbergues()
    } else {
      return this.findInstituicoes();
    }
  }

  findEntidadeById(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.findAlbergueById(id)
    } else {
      return this.findInstituicaoById(id);
    }
  }

  solicitarEntidade(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.solicitarAlbergue(id)
    } else {
      return this.solicitarInstituicao(id);
    }
  }

  aprovarEntidade(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.aprovarAlbergue(id)
    } else {
      return this.aprovarInstituicao(id);
    }
  }

  aprovarMembroEntidade(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.aprovarMembroAlbergue(id)
    } else {
      return this.aprovarMembroInstituicao(id);
    }
  }

  updateEntidade(tipo: string, entidade: any){
    if(tipo === "albergue"){
    return this.updateAlbergue(entidade);
    } else {
      return this.updateInstituicao(entidade);
    }
  }

  getEntidades(tipo: string){
    if(tipo === "albergue"){
      return this.getAlbergue()
    } else {
      return this.getInstituicao();
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

  findAlbergueById(id: number){
    return this._http.get(`${API}/api/abrigo/${id}`);
  }

  solicitarAlbergue(id: number){
    return this._http.patch(`${API}/api/abrigo/solicitar`, {abrigo_id: id})
  }

  aprovarAlbergue(id: number){
    return this._http.patch(`${API}/api/abrigo/aprovar`, {abrigo_id: id})
  }

  aprovarMembroAlbergue(id: number){
    return this._http.patch(`${API}/api/abrigo/aprovarUsuario`, {usuario_id: id})
  }

  updateAlbergue(albergue: Albergue){
    return this._http.put(`${API}/api/abrigo/${albergue.id}`, albergue);
  }

  getAlbergue() {
    return JSON.parse(localStorage.getItem(this.ALBERGUE));
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

  findInstituicaoById(id: number) {
    return this._http.get(`${API}/api/instituicoes/${id}`);
  }

  solicitarInstituicao(id: number){
    return this._http.patch(`${API}/api/instituicoes/solicitar`, {instituicao_id: id})
  }

  aprovarInstituicao(id: number){
    return this._http.patch(`${API}/api/instituicoes/aprovar`, {id: id})
  }

  aprovarMembroInstituicao(id: number){
    return this._http.patch(`${API}/api/instituicoes/aprovarUsuario`, {usuario_id: id})
  }

  updateInstituicao(instituicao: Entidade) {
    return this._http.put(`${API}/api/instituicoes/${instituicao.id}`, instituicao);
  }

  getInstituicao() {
    return JSON.parse(localStorage.getItem(this.INSTITUICAO));
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
