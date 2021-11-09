import { ModalDadosAbrigadoComponent } from './modal-dados-abrigado/modal-dados-abrigado.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// Material
import { MatTableDataSource } from '@angular/material/table';
// Model
import { Abrigado } from './../../models/abrigado.model';
// Service
import { AbrigadoService } from './../../services/abrigado.service';

@Component({
  selector: 'app-abrigado',
  templateUrl: './abrigado.component.html',
  styleUrls: ['./abrigado.component.css']
})
export class AbrigadoComponent implements OnInit {

  @Output() refreshList = new EventEmitter<boolean>();

  displayedColumns: string[] = ['nome', 'documento', 'telefone', 'data_de_nascimento', 'ver', 'history'];
  dataSource: MatTableDataSource<Abrigado>;
  abrigados: Abrigado[];

  constructor(
    private dialog: MatDialog,
    private _abrigadoService: AbrigadoService
  ) { this.populaTabela(); }

  ngOnInit(): void {
  }

  open(abrigado){
    this.dialog.open(ModalDadosAbrigadoComponent, {data: {id: abrigado.id, history: false}}).afterClosed().subscribe( result => {
      result.submit ? this.populaTabela() : '';
    });
  }

  openHistorico(abrigado){
    this.dialog.open(ModalDadosAbrigadoComponent, {data: {id: abrigado.id, history: true}});
  }

  onRegister(){
    this.dialog.open(ModalDadosAbrigadoComponent).afterClosed().subscribe( result => {
      result.submit ? this.populaTabela() : '';
    });
  }

  private populaTabela(){
    this._abrigadoService.findAbrigados().subscribe(response => {
      this.abrigados = response;
      this.dataSource = new MatTableDataSource(this.abrigados);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
