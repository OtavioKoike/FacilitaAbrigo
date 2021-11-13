import { ModalDadosEstadiaComponent } from './../../shared/modal-dados-estadia/modal-dados-estadia.component';
import { MatDialog } from '@angular/material/dialog';
import { Quarto } from 'src/app/models/quarto.model';
import { Component, OnInit } from '@angular/core';
import { QuartoService } from 'src/app/services/quarto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quartos = [] as Quarto[];

  data_inicial: string;
  data_final: string;

  constructor(
    private dialog: MatDialog,
    private _quartoService: QuartoService
  ) {   }

  ngOnInit(): void {
  }

  filtrar(dados: any){
    this.data_inicial = dados.data_inicial;
    this.data_final = dados.data_final;

    const caracteristicasSelecionadasIds = dados.caracteristicas.map(caract => {return caract.id}) as number[]
    this._quartoService.filtrar(this.data_inicial, this.data_final, dados.cidade, caracteristicasSelecionadasIds).subscribe(response => {
      this.quartos = response;
    })
  }

  onRegister(quarto: Quarto){
    const dados = {quarto: quarto, data_inicial: this.data_inicial, data_final: this.data_final} //enviar datas
    this.dialog.open(ModalDadosEstadiaComponent, {data: dados}).afterClosed().subscribe( result => {
    });
  }

}
