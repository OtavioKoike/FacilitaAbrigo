import { Component, OnInit } from '@angular/core';
// Model
import { Usuario } from './../../models/usuario.model';
// Service
import { AuthService } from './../../services/auth.service';
import { EntidadeService } from '../../services/entidade.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Usuario;

  constructor(
    private _authService: AuthService,
    private _entidadeService: EntidadeService
  ) {
    this.user = _authService.getUser();
   }

  ngOnInit(): void {
  }

  SignOut(){
    this._authService.doLogoutUser();
  }

}
