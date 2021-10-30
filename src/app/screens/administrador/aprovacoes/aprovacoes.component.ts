import { Albergue } from './../../../models/albergue.model';
import { EntidadeService } from '../../../services/entidade.service';
import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-aprovacoes',
  templateUrl: './aprovacoes.component.html',
  styleUrls: ['./aprovacoes.component.css']
})
export class AprovacoesComponent implements OnInit {

  displayedColumns: string[] = ['tipo', 'nome', 'cidade', 'descricao', 'aprovar'];
  dataSource: MatTableDataSource<Albergue>;
  entidades: any[];

  constructor(private _entidadeService: EntidadeService) {
    this.populaTabela();
  }

  ngOnInit(): void {
  }

  Aprovar(entidade){
    let tipo = entidade.descricao ? "albergue" : "instituicao";
    this._entidadeService.aprovarEntidade(tipo, entidade.id).subscribe(() => {
      this.populaTabela()
    })
  }

  private populaTabela(){
    this._entidadeService.findAlbergues().subscribe(responseAbrigo => {
      this.entidades = (responseAbrigo as any[]).filter(albergue => {return !albergue.aprovado; })
      this._entidadeService.findInstituicoes().subscribe(responseInstituicao => {
        this.entidades = [...this.entidades, ...(responseInstituicao as any[]).filter(entidade => {return !entidade.aprovado; })];
        this.dataSource = new MatTableDataSource(this.entidades);
      })
    })
  }

}
