import { Caracteristica } from './../../../models/caracteristica.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  @Output() dadosFiltro = new EventEmitter<any>();
  data_inicial: string;
  data_final: string;
  cidade: string;

  caracteristicasSelecionadas: Caracteristica[] = [];


  constructor() { }

  ngOnInit(): void {
  }

  atualizaChips(caract: Caracteristica[]){
    this.caracteristicasSelecionadas = caract;
  }

  filtrar(){
    let dados = {
      data_inicial: this.data_inicial,
      data_final: this.data_final,
      cidade: this.cidade,
      caracteristicas: this.caracteristicasSelecionadas
    }
    this.dadosFiltro.emit(dados)
  }

}
