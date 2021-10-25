import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { AuthService } from './../../services/auth.service';
import { InstituicaoService } from './../../services/instituicao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Usuario;

  constructor(
    private _authService: AuthService,
    private _instituicaoService: InstituicaoService
  ) {
    this.user = _authService.getUser();
   }

  ngOnInit(): void {
  }

  SignOut(){
    this._instituicaoService.removeAll();
    this._authService.doLogoutUser();
  }

}
