import { Albergue } from './../../../models/albergue.model';
import { InstituicaoService } from './../../../services/instituicao.service';
import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-aprovacoes',
  templateUrl: './aprovacoes.component.html',
  styleUrls: ['./aprovacoes.component.css']
})
export class AprovacoesComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'tipo', 'cep', 'descricao', 'aprovar'];
  dataSource: MatTableDataSource<Albergue>;
  instituicoes: any[];

  constructor(private _instituicaoService: InstituicaoService) {
    this.populaTabela();
  }

  ngOnInit(): void {
  }

  Aprovar(instituicao){
    let tipo = instituicao.descricao ? "albergue" : "saude";
    this._instituicaoService.aprovarInstituicao(tipo, instituicao.id).subscribe(() => {
      this.populaTabela()
    })
  }

  private populaTabela(){
    let response;
    this._instituicaoService.findAlbergues().subscribe(res => {
      response = res;
      this.instituicoes = response.filter(albergue => {return !albergue.aprovado; })
      this._instituicaoService.findSaudes().subscribe(res => {
        response = res;
        this.instituicoes = [...this.instituicoes, ...response.filter(instituicao => {return !instituicao.aprovado; })];
        this.dataSource = new MatTableDataSource(this.instituicoes);
      })
    })
  }

}
