import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// RxJs
import { Observable } from 'rxjs';
// Material
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// Component
import { PopupComponent } from './../../../shared/popup/popup.component';
// Model
import { Albergue } from './../../../models/albergue.model';
// Service
import { CepService } from './../../../services/cep.service';
import { EntidadeService } from '../../../services/entidade.service';

@Component({
  selector: 'app-sign-up-place',
  templateUrl: './sign-up-place.component.html',
  styleUrls: ['./sign-up-place.component.css']
})
export class SignUpPlaceComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cidade'];
  dataSource: MatTableDataSource<Albergue>;
  clickedRows = new Set<any>();

  role = "" as string;
  tipo = "" as string;
  txtBotao = "Cadastrar" as string;

  entidade = {} as Albergue;

  listEntidades$: Observable<Object>;
  listEntidades: Albergue[];

  constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private _router: Router,
    private _cepService: CepService,
    private _entidadeService: EntidadeService
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
    this.entidade.cep = cepJson.cep;
    this.entidade.cidade = cepJson.localidade
    this.entidade.bairro = cepJson.bairro;
    this.entidade.rua = cepJson.logradouro;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(){
    this.txtBotao = this.role === 'employee' ? 'Solicitar' : 'Cadastrar';
    this.entidade = {} as Albergue;

    if(this.role === "employee"){
      if(this.tipo === ''){ return; }
      this.listEntidades$ = this._entidadeService.findEntidades(this.tipo);
      this.listEntidades$.subscribe(response => {
        this.listEntidades = (response as Albergue[]).filter(entidade => {return entidade.aprovado; })
        this.dataSource = new MatTableDataSource(this.listEntidades)
      })
    }
  }

  onSelect(row){
    this.clickedRows.clear();
    this.clickedRows.add(row);
    this.entidade = row;
  }

  async onSubmit(form: NgForm){
    if(this.role === "owner"){
      this._entidadeService.createEntidade(this.tipo, this.entidade).subscribe(
        response => {
          this._entidadeService.storeEntidade(this.tipo, response);
          this._authService.findByPk(this._authService.getUser());
          let mensagem = { principal: "Cadastro realizado com sucesso!", secundaria: "Sua instituição será avaliada e aprovada em breve."}
          this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe(
            result => {
              this._router.navigateByUrl('/menu');

            }
          )
        }
      );
    } else {
      this._entidadeService.solicitarEntidade(this.tipo, this.entidade.id).subscribe(
        response => {
          this._entidadeService.storeEntidade(this.tipo, this.entidade);
          this._authService.findByPk(this._authService.getUser());
          let mensagem = { principal: "Solicitação realizada com sucesso!", secundaria: "Sua solicitação será avaliada e aprovada em breve."}
          this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe(
            result => {
              this._router.navigateByUrl('/menu');
            }
          )
        }
      );
    }
  }

}
