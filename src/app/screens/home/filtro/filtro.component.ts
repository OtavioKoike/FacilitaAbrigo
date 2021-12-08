import { Usuario } from './../../../models/usuario.model';
import { AuthService } from './../../../services/auth.service';
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

  user: Usuario;
  cidadeUser: string;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.user = this._authService.getUser();
    this.cidadeUser = this.user.abrigo_id ? this.user.abrigo.cidade : this.user.instituicao_id ? this.user.instituicao.cidade : "Itajubá";
  }

  atualizaChips(caract: Caracteristica[]) {
    this.caracteristicasSelecionadas = caract;
  }

  filtrar() {
    let dados = {
      data_inicial: this.data_inicial,
      data_final: this.data_final,
      cidade: this.cidade,
      caracteristicas: this.caracteristicasSelecionadas
    }
    this.dadosFiltro.emit(dados)
  }

  limpar() {
    this.data_inicial = null;
    this.data_final = null;
    this.cidade = null;
    this.caracteristicasSelecionadas = [];

    let dados = {
      data_inicial: this.data_inicial,
      data_final: this.data_final,
      cidade: this.cidadeUser,
      caracteristicas: this.caracteristicasSelecionadas
    }
    this.dadosFiltro.emit(dados)
  }

}
