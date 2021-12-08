import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from './../../models/usuario.model';
import { Caracteristica } from './../../models/caracteristica.model';
import { Albergue } from './../../models/albergue.model';
import { Quarto } from 'src/app/models/quarto.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Component
import { PopupComponent } from './../popup/popup.component';
import { ModalDadosQuartoAgendamentoComponent } from './modal-dados-quarto-agendamento/modal-dados-quarto-agendamento.component';
// API
import { API } from '../../../../app.api'

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.css']
})
export class QuartoComponent implements OnInit {

  @Output() update = new EventEmitter<Quarto>();
  @Output() delete = new EventEmitter<Quarto>();
  @Output() agendar = new EventEmitter<Quarto>();
  @Input() quarto: Quarto;
  @Input() rota: string;
  @Input() dados: Albergue;

  url: string;
  caracteristicas: Caracteristica[];
  plus = { nome: "..." } as Caracteristica;

  user: Usuario;
  constructor(
    private _authService: AuthService,
    public dialog: MatDialog,
  ) {
    this.user = _authService.getUser();
  }

  ngOnInit(): void {
    this.url = `${API}${this.quarto.imagens[this.quarto.imagens.length - 1].url}`
    this.caracteristicas = this.quarto.caracteristicas;
    if (this.caracteristicas.length > 3) {
      this.caracteristicas = this.caracteristicas.slice(0, 2);
      this.caracteristicas.push(this.plus)
    }
  }

  onUpdate() {
    this.update.emit(this.quarto)
  }

  onDelete() {
    let mensagem = { principal: "Excluir Quarto", secundaria: "Você tem certeza que deseja remover esse quarto?", botao: "Confirmar" }
    this.dialog.open(PopupComponent, { data: mensagem }).afterClosed().subscribe(result => {
      result.submit ? this.delete.emit(this.quarto) : '';
    });
  }

  onAgendar() {
    this.agendar.emit(this.quarto)
  }

  onDados() {
    let quarto = this.quarto;
    let dados = this.dados;
    this.dialog.open(ModalDadosQuartoAgendamentoComponent, { data: { quarto, dados }, width: '600px', });
  }

}
