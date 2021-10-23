import { Observable } from 'rxjs';
import { Albergue } from './../models/albergue.model';
import { Instituicao } from './../models/instituicao.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../app.api'

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  private readonly ALBERGUE = 'ALBERGUE';
  private readonly INSTITUICAO = 'INSTITUICAO';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // ----------------------------------------------------
  // Instituicao (Albergue ou Saude)
  createInstituicao(tipo: string, instituicao: any){
    if(tipo === "albergue"){
    return this.createAlbergue(instituicao);
    } else {
      return this.createSaude(instituicao);
    }
  }

  findInstituicao(tipo: string){
    if(tipo === "albergue"){
      return this.findAlbergues()
    } else {
      return this.findSaudes();
    }
  }

  solicitarInstituicao(tipo: string, id: number){
    if(tipo === "albergue"){
      return this.solicitarAlbergue(id)
    } else {
      return this.solicitarSaude(id);
    }
  }

  getInstituicao(tipo: string){
    if(tipo === "albergue"){
      return this.getAlbergue()
    } else {
      return this.getSaude();
    }
  }

  storeInstituicao(tipo: string, instituicao: any){
    if(tipo === "albergue"){
      return this.storeAlbergue(instituicao);
    } else {
      return this.storeSaude(instituicao);
    }
  }

  // ----------------------------------------------------
  // Albergue
  createAlbergue(albergue: Albergue){
    return this.http.post(`${API}/api/abrigo`, albergue);
  }

  findAlbergues(){
    return this.http.get(`${API}/api/abrigo`);
  }

  solicitarAlbergue(id: number){
    return this.http.patch(`${API}/api/abrigo/solicitar`, {abrigo_id: id})
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
  // Saude
  createSaude(instituicao: Instituicao) {
    return this.http.post(`${API}/api/instituicoes`, instituicao);
  }

  findSaudes() {
    return this.http.get(`${API}/api/instituicoes`);
  }

  solicitarSaude(id: number){
    return this.http.patch(`${API}/api/instituicoes/solicitar`, {instituicao_id: id})
  }

  getSaude() {
    return JSON.parse(localStorage.getItem(this.INSTITUICAO));
  }

  storeSaude(instituicao: Instituicao) {
    localStorage.setItem(this.INSTITUICAO, JSON.stringify(instituicao));
  }

  removeSaude() {
    localStorage.removeItem(this.INSTITUICAO);
  }

  // ----------------------------------------------------
  // Storage

  removeAll(){
    this.removeAlbergue();
    this.removeSaude();
  }
}
