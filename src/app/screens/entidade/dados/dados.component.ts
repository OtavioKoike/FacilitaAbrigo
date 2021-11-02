import { PopupComponent } from './../../../shared/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Albergue } from './../../../models/albergue.model';
import { EntidadeService } from './../../../services/entidade.service';
import { AuthService } from './../../../services/auth.service';
import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cargo', 'email'];
  dataSource: MatTableDataSource<Usuario>;

  user: Usuario;
  membros: Usuario[];
  dados: Albergue;

  tipo: string;
  id: number;

  constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private _entidadeService: EntidadeService
  ) {
    this.user = this._authService.getUser() as Usuario;
    if(this.user.abrigo_id) {
      this.id = this.user.abrigo_id;
      this.tipo = "albergue";
    } else {
      this.id = this.user.instituicao_id;
      this.tipo = "instituição";
    }

    this.populaTabela();
  }

  ngOnInit(): void {
    this.populaTabela()
  }

  private populaTabela(){
    this._entidadeService.findEntidadeById(this.tipo, this.id).subscribe(response => {
      this.dados = response as Albergue;
      console.log(this.dados)
      this.membros = (response as any).funcionarios.filter(funcionario => {return funcionario.role !== 0 })
      this.dataSource = new MatTableDataSource(this.membros);
    })
  }

  async onSave(){
    this._entidadeService.updateEntidade(this.tipo, this.dados).subscribe(
      response => {
        this._entidadeService.storeEntidade(this.tipo, response);

        let mensagem = { principal: "Atualização realizada com sucesso!", secundaria: ""}
        this.dialog.open(PopupComponent, {data:  mensagem });
      }
    );
  }

}
