import { AuthService } from './../../../services/auth.service';
import { Usuario } from './../../../models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { Albergue } from './../../../models/albergue.model';
import { EntidadeService } from './../../../services/entidade.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-aprovacoes-membros',
  templateUrl: './aprovacoes-membros.component.html',
  styleUrls: ['./aprovacoes-membros.component.css']
})
export class AprovacoesMembrosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'cpf', 'aprovar'];
  dataSource: MatTableDataSource<Usuario>;
  membros: Usuario[];

  tipo: string;
  id: number;

  constructor(
    private _authService: AuthService,
    private _entidadeService: EntidadeService
  ) {
    const usuario = this._authService.getUser() as Usuario;
    if(usuario.abrigo_id) {
      this.id = usuario.abrigo_id;
      this.tipo = "albergue";
    } else {
      this.id = usuario.instituicao_id;
      this.tipo = "instituição";
    }

    this.populaTabela();
  }

  ngOnInit(): void {
  }

  Aprovar(membro){
    this._entidadeService.aprovarMembroEntidade(this.tipo, membro.id).subscribe(() => {
      this.populaTabela()
    })
  }

  private populaTabela(){
    this._entidadeService.findEntidadeById(this.tipo, this.id).subscribe(response => {
      this.membros = (response as any).funcionarios.filter(funcionario => {return funcionario.role === 0 })
      this.dataSource = new MatTableDataSource(this.membros);
    })
  }

}
