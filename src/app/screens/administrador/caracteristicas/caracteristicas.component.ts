import { Component, OnInit } from '@angular/core';
// Material
import { MatTableDataSource } from '@angular/material/table';
// Model
import { Caracteristica } from './../../../models/caracteristica.model';
// Service
import { CaracteristicasService } from './../../../services/caracteristicas.service';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {

  displayedColumns: string[] = ['caracteristica', 'delete'];
  dataSource: MatTableDataSource<Caracteristica>;

  listCaracteristicas: Caracteristica[]

  caracteristica: string;

  constructor( private _caracteristicaService: CaracteristicasService) { }

  ngOnInit(): void {
    this.populaTabela()
  }

  deletar(caracteristica: Caracteristica){
    this._caracteristicaService.delete(caracteristica.id).subscribe(() => {
      this.populaTabela()
    })
  }

  cadastrar(){
    this._caracteristicaService.create(this.caracteristica).subscribe(() => {
      this.populaTabela()
    })
  }

  populaTabela(){
    this._caracteristicaService.find().subscribe(response => {
      this.listCaracteristicas = response;
      this.dataSource = new MatTableDataSource(this.listCaracteristicas)
    })
  }

}
