import { Albergue } from './../../../models/albergue.model';
import { QuartoService } from './../../../services/quarto.service';
import { ModalDadosQuartoComponent } from './modal-dados-quarto/modal-dados-quarto.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Quarto } from 'src/app/models/quarto.model';

@Component({
  selector: 'app-quartos',
  templateUrl: './quartos.component.html',
  styleUrls: ['./quartos.component.css']
})
export class QuartosComponent implements OnInit {

  @Output() refreshList = new EventEmitter<boolean>();
  @Input() quartos: Quarto[];
  @Input() dados: Albergue;

  constructor(
    private dialog: MatDialog,
    private _quartoService: QuartoService
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.dialog.open(ModalDadosQuartoComponent).afterClosed().subscribe( result => {
      result.submit ? this.refreshList.emit(true): '';
    });
  }

  onUpdate(item: Quarto) {
    let dados = { quarto: item}
    this.dialog.open(ModalDadosQuartoComponent, {data:  dados }).afterClosed().subscribe( result => {
      result.submit ? this.refreshList.emit(true): '';
    });
  }

  onDelete(item: Quarto){
    this._quartoService.delete(item.id).subscribe(() => {
      this.refreshList.emit(true)
    })
  }

}
