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
  @Input() tipo: string;
  @Input() dados = {} as Albergue;
  @Input() set membros(value: Usuario[]){
      this.dataSource = new MatTableDataSource(value);
  }

  displayedColumns: string[] = ['nome', 'cargo', 'email'];
  dataSource: MatTableDataSource<Usuario>;

  user: Usuario;
  edit = false;

  constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private _entidadeService: EntidadeService,
    private _cepService: CepService
  ) {
    this.user = this._authService.getUser() as Usuario;
  }

  ngOnInit(): void { }

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

  setEdit(){
    this.edit = !this.edit;
  }

  onCancel(){
    this.refreshList.emit(true);
    this.edit = false;
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
