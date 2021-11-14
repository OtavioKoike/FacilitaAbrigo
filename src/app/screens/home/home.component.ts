import { Filtro } from './../../models/filtro.model';
import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../models/usuario.model';
import { ModalDadosEstadiaComponent } from './../../shared/modal-dados-estadia/modal-dados-estadia.component';
import { MatDialog } from '@angular/material/dialog';
import { Quarto } from 'src/app/models/quarto.model';
import { Component, OnInit } from '@angular/core';
import { QuartoService } from 'src/app/services/quarto.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quartos = [] as Quarto[];

  data_inicial: string;
  data_final: string;

  user: Usuario;
  cidade: string;

  constructor(
    private dialog: MatDialog,
    private _authService: AuthService,
    private _quartoService: QuartoService
  ) {   }

  ngOnInit(): void {
    this.user = this._authService.getUser();
    this.cidade = this.user.abrigo_id ? this.user.abrigo.cidade : this.user.instituicao_id ? this.user.instituicao.cidade : "Itajubá";

    const filtro = {
      data_inicial: null,
      data_final: null,
      cidade: !isUndefined(this.cidade) ? this.cidade : null,
      caracteristicasIds: [],
      abrigo_id: null
    } as Filtro;

    this._quartoService.filtrar(filtro).subscribe(response => {
      this.quartos = response;
    })
  }

  filtrar(dados: any){
    const caracteristicasSelecionadasIds = dados.caracteristicas.map(caract => {return caract.id}) as number[]
    this.data_inicial = dados.data_inicial;
    this.data_final = dados.data_final;

    const filtro = {
      data_inicial: !isUndefined(dados.data_inicial) ? dados.data_inicial : null,
      data_final: !isUndefined(dados.data_final) ? dados.data_final : null,
      cidade: !isUndefined(dados.cidade) ? dados.cidade : null,
      caracteristicasIds: !isUndefined(caracteristicasSelecionadasIds) ? caracteristicasSelecionadasIds : [],
      abrigo_id: null
    } as Filtro;

    this._quartoService.filtrar(filtro).subscribe(response => {
      this.quartos = response;
    })
  }

  onRegister(quarto: Quarto){
    const dados = {quarto: quarto, data_inicial: this.data_inicial, data_final: this.data_final} //enviar datas
    this.dialog.open(ModalDadosEstadiaComponent, {data: dados}).afterClosed().subscribe( result => {
    });
  }

}
