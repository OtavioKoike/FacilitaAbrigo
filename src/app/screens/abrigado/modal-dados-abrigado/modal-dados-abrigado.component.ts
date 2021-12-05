import { PopupComponent } from './../../../shared/popup/popup.component';
import { MatTableDataSource } from '@angular/material/table';
import { Estadia } from './../../../models/estadia.model';
import { AbrigadoService } from './../../../services/abrigado.service';
import { Abrigado } from './../../../models/abrigado.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-dados-abrigado',
  templateUrl: './modal-dados-abrigado.component.html',
  styleUrls: ['./modal-dados-abrigado.component.css']
})
export class ModalDadosAbrigadoComponent implements OnInit {

  abrigado = {} as Abrigado;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalDadosAbrigadoComponent>,
    private _abrigadoService: AbrigadoService
  ) { }

  ngOnInit(): void {
  }

  onCreate(){
    this._abrigadoService.createAbrigado(this.abrigado).subscribe( response => {
      let mensagem = { principal: "Cadastro realizado com sucesso!", secundaria: "", botao: "Fechar"}
      this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe(
        responseDialog => {
          this.dialogRef.close({ submit: response });
        }
      )
    })
  }

}
