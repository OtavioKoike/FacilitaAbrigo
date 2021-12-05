import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './../../../shared/popup/popup.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { AbrigadoService } from './../../../services/abrigado.service';
import { Estadia } from './../../../models/estadia.model';
import { Abrigado } from './../../../models/abrigado.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dados-historico',
  templateUrl: './dados-historico.component.html',
  styleUrls: ['./dados-historico.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DadosHistoricoComponent implements OnInit {

  columnsToDisplay: string[] = ['abrigo', 'quarto', 'dtInicio', 'dtFim', 'eventos'];
  dataSource: MatTableDataSource<Estadia>;
  expandedElement: Estadia | null;

  abrigado = {} as Abrigado;
  estadias = {} as Estadia[];
  edit = false;
  id: number;

  constructor(
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _abrigadoService: AbrigadoService
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.findAbrigado();
  }

  findAbrigado() {
    this._abrigadoService.findAbrigadobyPk(this.id).subscribe(response => {
      this.abrigado = response;
      this.abrigado.data_de_nascimento = response.data_de_nascimento.substring(0, 10);
      this.estadias = response.estadias;
      this.dataSource = new MatTableDataSource(this.estadias)
    })
    this.edit = false;
  }

  setEdit(){
    this.edit = !this.edit;
  }

  onSave(){
    this._abrigadoService.updateAbrigado(this.abrigado).subscribe(
      response => {
        let mensagem = { principal: "Atualização realizada com sucesso!", secundaria: "", botao: "Fechar"}
        this.dialog.open(PopupComponent, {data:  mensagem });
    })
    this.edit = false;
  }

}
