import { QuartoService } from './../../services/quarto.service';
import { Quarto } from 'src/app/models/quarto.model';
import { MatTableDataSource } from '@angular/material/table';
import { Caracteristica } from './../../models/caracteristica.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-dados-estadia',
  templateUrl: './modal-dados-estadia.component.html',
  styleUrls: ['./modal-dados-estadia.component.css']
})
export class ModalDadosEstadiaComponent implements OnInit {

  displayedColumns: string[] = ['nome'];
  dataSource: MatTableDataSource<Quarto>;
  clickedRows = new Set<any>();

  caracteristicasSelecionadas: Caracteristica[] = [];
  data_inicial: string;
  data_final: string;

  quarto: Quarto;
  quartos: Quarto[];
  isQuarto: boolean = false;

  constructor(
    private _quartoService: QuartoService
  ) { }

  ngOnInit(): void {
  }

  atualizaChips(caract: Caracteristica[]){
    this.caracteristicasSelecionadas = caract;
  }

  filtrar(){
    const caracteristicasSelecionadasIds = this.caracteristicasSelecionadas.map(caract => { return caract.id})
    this._quartoService.filtrar(this.data_inicial, this.data_final, caracteristicasSelecionadasIds).subscribe(response => {
      this.quartos = response;
      this.dataSource = new MatTableDataSource(this.quartos);
    })
  }

  onSelect(row){
    this.clickedRows.clear();
    this.clickedRows.add(row);
    this.quarto = row;
  }

  avancar(){
    this.isQuarto = true;
  }

}
