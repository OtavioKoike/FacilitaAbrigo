import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// Model
import { Usuario } from '../models/usuario.model';
// API
import { API } from '../../../app.api'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USUARIO = 'USER';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public loggedUser: string;

  constructor(
    private http: HttpClient,
    private _router: Router
    ) { }

  // ----------------------------------------------------
  // Login / Logout

  login(user: { email: string, senha: string }) {
    return this.http.post<Usuario>(`${API}/api/usuario/login`, user);
  }

  doLoginUser(user, token, refresh_token) {
    this.loggedUser = user.nome;
    this.storeTokens(token, refresh_token);
    this.storeUser(user);
  }

  doLogoutUser() {
    this.loggedUser = null;
    this.clearStorage();
    this._router.navigate(['sign-in'])
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // ----------------------------------------------------
  // Create

  onCreateUser(user: Usuario) {
    return this.http.post<Usuario>(`${API}/api/usuario`, user)
  }

  // ----------------------------------------------------
  // Tokens

  getUser() {
    return JSON.parse(localStorage.getItem(this.USUARIO));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeUser(user: Usuario) {
    localStorage.setItem(this.USUARIO, JSON.stringify(user));
  }

  storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(jwt, refresh_token) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    localStorage.setItem(this.REFRESH_TOKEN, refresh_token);
  }

  private removeUser() {
    localStorage.removeItem(this.USUARIO);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private clearStorage(){
    localStorage.clear();
  }

}
