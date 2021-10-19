import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopupComponent } from './../../../shared/popup/popup.component';
import { Albergue } from './../../../models/albergue.model';
import { CepService } from './../../../services/cep.service';
import { InstituicaoService } from './../../../services/instituicao.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-place',
  templateUrl: './sign-up-place.component.html',
  styleUrls: ['./sign-up-place.component.css']
})
export class SignUpPlaceComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'descricao'];
  dataSource: MatTableDataSource<Albergue>;
  clickedRows = new Set<any>();

  role = "" as string;
  tipo = "" as string;
  txtBotao = "Cadastrar" as string;

  instituicao = {} as Albergue;

  listInstituicoes$: Observable<Object>;
  listInstituicoes: Albergue[];

  constructor(
    public dialog: MatDialog,
    private _cepService: CepService,
    private _instituicaoService: InstituicaoService
  ) { }

  ngOnInit(): void {  }

  onFind(cep: string){
    var padrao = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;

    if(!padrao.test(cep.trim())){
      return
    }

    this._cepService.Find(cep)
    .subscribe(data => this.ConvertCepJson(data));
  }

  ConvertCepJson(cepJson){
    this.instituicao.cep = cepJson.cep;
    this.instituicao.bairro = cepJson.bairro;
    this.instituicao.rua = cepJson.logradouro;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(){
    this.txtBotao = this.role === 'employee' ? 'Solicitar' : 'Cadastrar';
    this.instituicao = {} as Albergue;

    if(this.tipo === 'albergue') {
      this.displayedColumns = ['nome', 'descricao'];
    } else {
      this.displayedColumns = ['nome'];
    }

    if(this.role === "employee"){
      if(this.tipo === ''){ return; }
      let response;
      this.listInstituicoes$ = this._instituicaoService.findInstituicao(this.tipo);
      this.listInstituicoes$.subscribe(request => {
        response = request;
        this.listInstituicoes = response.instancias.filter(instituicao => {return instituicao.aprovado; })
        this.dataSource = new MatTableDataSource(this.listInstituicoes)
      })
    }
  }

  onSelect(row){
    this.clickedRows.clear();
    this.clickedRows.add(row);
    this.instituicao = row;
  }

  async onSubmit(form: NgForm){
    if(this.role === "owner"){
      let response;
      this._instituicaoService.createInstituicao(this.tipo, this.instituicao).subscribe(
        request => {
          response = request;
          this._instituicaoService.storeInstituicao(this.tipo, request);

          let mensagem = { principal: "Cadastro realizado com sucesso!", secundaria: "Sua instituição será avaliada e aprovada em breve."}
          this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe(
            result => {
              //Rota
            }
          )
        }
      );
    } else {
      this._instituicaoService.solicitarInstituicao(this.tipo, this.instituicao.id).subscribe(
        request => {
          this._instituicaoService.storeInstituicao(this.tipo, this.instituicao);

          let mensagem = { principal: "Solicitação realizada com sucesso!", secundaria: "Sua solicitação será avaliada e aprovada em breve."}
          this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe(
            result => {
              //Rota
            }
          )
        }
      );
    }
  }

}
