import { Component, OnInit } from '@angular/core';
// Model
import { Usuario } from './../../models/usuario.model';
// Service
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-entidade',
  templateUrl: './entidade.component.html',
  styleUrls: ['./entidade.component.css']
})
export class EntidadeComponent implements OnInit {

  user: Usuario;
  refreshListItem = false;
  constructor(
    private _authService: AuthService
  ) { this.user = this._authService.getUser() }

  ngOnInit(): void {
  }

  refreshList($event){
    this.refreshListItem = $event;
  }

}
