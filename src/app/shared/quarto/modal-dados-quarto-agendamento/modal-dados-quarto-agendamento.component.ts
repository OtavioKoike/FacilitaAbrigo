import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-dados-quarto-agendamento',
  templateUrl: './modal-dados-quarto-agendamento.component.html',
  styleUrls: ['./modal-dados-quarto-agendamento.component.css']
})
export class ModalDadosQuartoAgendamentoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
  }

}
