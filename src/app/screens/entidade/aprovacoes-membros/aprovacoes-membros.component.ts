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
