import { Quarto } from './../../models/quarto.model';
import { Albergue } from './../../models/albergue.model';
import { EntidadeService } from './../../services/entidade.service';
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

  dados = {} as Albergue;
  membros: Usuario[];
  membrosSemPermissao: Usuario[];
  quartos: Quarto[];

  user: Usuario;
  tipo: string;
  id: number;

  constructor(
    private _entidadeService: EntidadeService,
    private _authService: AuthService
  ) {
    this.user = this._authService.getUser();

    if(this.user.abrigo_id) {
      this.id = this.user.abrigo_id;
      this.tipo = "albergue";
    } else {
      this.id = this.user.instituicao_id;
      this.tipo = "instituição";
    }

    this.populaDados();
  }

  ngOnInit(): void {
  }

  refreshList($event){
    this.populaDados();
  }

  private populaDados(){
    this._entidadeService.findEntidadeById(this.tipo, this.id).subscribe(response => {
      this.dados = response as Albergue;
      this.membros = (response as any).funcionarios.filter(funcionario => {return funcionario.role !== 0 })
      this.membrosSemPermissao = (response as any).funcionarios.filter(funcionario => {return funcionario.role === 0 })
      this.quartos = (response as Albergue).quartos;
    })
  }

}
