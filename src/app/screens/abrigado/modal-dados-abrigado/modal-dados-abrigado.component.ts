import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Estadia } from './../../../models/estadia.model';
import { AbrigadoService } from './../../../services/abrigado.service';
import { Abrigado } from './../../../models/abrigado.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-dados-abrigado',
  templateUrl: './modal-dados-abrigado.component.html',
  styleUrls: ['./modal-dados-abrigado.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ModalDadosAbrigadoComponent implements OnInit {

  columnsToDisplay: string[] = ['abrigo', 'quarto', 'dtInicio', 'dtFim', 'eventos'];
  dataSource: MatTableDataSource<Estadia>;
  expandedElement: Estadia | null;

  history = false;
  abrigado = {} as Abrigado;
  estadias = {} as Estadia[];
  edit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ModalDadosAbrigadoComponent>,
    private _abrigadoService: AbrigadoService
  ) {
    if(data) {
      this.history = this.data.history ? this.data.history : false;
      this.data.id ? this.findAbrigado(this.data.id) : '';
    }
  }

  ngOnInit(): void {
  }

  findAbrigado(id: number) {
    this._abrigadoService.findAbrigadobyPk(id).subscribe(response => {
      this.abrigado = response;
      this.abrigado.data_de_nascimento = response.data_de_nascimento.substring(0, 10);
      this.estadias = response.estadias;
      this.dataSource = new MatTableDataSource(this.estadias)
    })
  }

  onChangeEdit(){
    this.edit = !this.edit;
    console.log(this.abrigado.data_de_nascimento)

  }

  onSave(){
    this._abrigadoService.updateAbrigado(this.abrigado).subscribe( response => {
      this.dialogRef.close({ submit: true });
    })
  }

  onCreate(){
    this._abrigadoService.createAbrigado(this.abrigado).subscribe( response => {
      this.dialogRef.close({ submit: true });
    })
  }

}
