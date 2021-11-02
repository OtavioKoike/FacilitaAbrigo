import { Usuario } from './../../models/usuario.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entidade',
  templateUrl: './entidade.component.html',
  styleUrls: ['./entidade.component.css']
})
export class EntidadeComponent implements OnInit {

  user: Usuario;

  constructor(
    private _authService: AuthService
  ) { this.user = this._authService.getUser() }

  ngOnInit(): void {
  }

}
