import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Material
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
// Component
import { PopupComponent } from './../../../shared/popup/popup.component';
// Model
import { Albergue } from './../../../models/albergue.model';
import { Usuario } from './../../../models/usuario.model';
// Service
import { AuthService } from './../../../services/auth.service';
import { CepService } from './../../../services/cep.service';
import { EntidadeService } from './../../../services/entidade.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  @Output() refreshList = new EventEmitter<boolean>();
  @Input() set refreshListItem(value: boolean){
    if(value){
      this.populaTabela();
      this.refreshListItem = false;
    }
  }

  displayedColumns: string[] = ['nome', 'cargo', 'email'];
  dataSource: MatTableDataSource<Usuario>;

  user: Usuario;
  membros: Usuario[];
  dados: Albergue;

  tipo: string;
  id: number;
  edit = false;

  constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private _entidadeService: EntidadeService,
    private _cepService: CepService
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

  onFind(cep: string){
    var padrao = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;

    if(!padrao.test(cep.trim())){
      return
    }

    this._cepService.Find(cep)
    .subscribe(data => this.ConvertCepJson(data));
  }

  ConvertCepJson(cepJson){
    this.dados.cep = cepJson.cep;
    this.dados.cidade = cepJson.localidade
    this.dados.bairro = cepJson.bairro;
    this.dados.rua = cepJson.logradouro;
  }

  private populaTabela(){
    this._entidadeService.findEntidadeById(this.tipo, this.id).subscribe(response => {
      this.dados = response as Albergue;
      this.membros = (response as any).funcionarios.filter(funcionario => {return funcionario.role !== 0 })
      this.dataSource = new MatTableDataSource(this.membros);
    })
    this.edit = false;
  }

  setEdit(){
    this.edit = !this.edit;
  }

  async onSave(){
    this._entidadeService.updateEntidade(this.tipo, this.dados).subscribe(
      response => {
        this._entidadeService.storeEntidade(this.tipo, response);

        let mensagem = { principal: "Atualização realizada com sucesso!", secundaria: ""}
        this.dialog.open(PopupComponent, {data:  mensagem });
      }
    );
    this.edit = false;
  }

}
