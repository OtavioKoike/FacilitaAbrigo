import { Caracteristica } from './../../../../models/caracteristica.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from './../../../../shared/popup/popup.component';
import { QuartoService } from './../../../../services/quarto.service';
import { AuthService } from './../../../../services/auth.service';
import { CaracteristicasService } from './../../../../services/caracteristicas.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
import { Quarto } from 'src/app/models/quarto.model';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-dados-quarto',
  templateUrl: './modal-dados-quarto.component.html',
  styleUrls: ['./modal-dados-quarto.component.css']
})
export class ModalDadosQuartoComponent implements OnInit {

  caracteristicasSelecionadas: Caracteristica[] = [];

  title = "Cadastrar Quarto"
  quarto = {} as Quarto;
  file = [];
  isNewFile = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalDadosQuartoComponent>,
    private _caracteristicaService: CaracteristicasService,
    private _authService: AuthService,
    private _quartoService: QuartoService
  ) {
    if(data){
      this.title = "Editar Quarto";
      this.quarto = data.quarto;
      this.caracteristicasSelecionadas = data.quarto.caracteristicas;
      this.file.push({name: this.quarto.imagens[this.quarto.imagens.length - 1].url} as File);
      this.isNewFile = false;
    }

  }

  ngOnInit(): void {
  }

  atualizaChips(caract: Caracteristica[]){
    this.caracteristicasSelecionadas = caract;
  }

  onCreate() {
    const user = this._authService.getUser();
    this.quarto.abrigo_id = user.abrigo_id;

    if(this.data){
      this._quartoService.update(this.quarto).subscribe(
        response => {
          let mensagem = { principal: "Atualização realizada com sucesso!" };
          this.onCreateCaracteristicas(this.quarto, mensagem);
          this.isNewFile ? this.uploadFile(this.quarto) : '';
        }
      );
    } else {
      this._quartoService.create(this.quarto).subscribe(
        response => {
          const quartoResponse = response
          let mensagem = { principal: "Cadastro realizado com sucesso!" };
          this.onCreateCaracteristicas(quartoResponse, mensagem);
          this.uploadFile(quartoResponse);
        }
      );
    }
  }

  private onCreateCaracteristicas(quartoResponse: Quarto, mensagem) {
    const caracteristicasSelecionadasIds = this.caracteristicasSelecionadas.map(caract => caract.id)
    this._quartoService.addCaracteristicas(quartoResponse, caracteristicasSelecionadasIds).subscribe(
      responseCaract => {
        this.dialog.open(PopupComponent, { data: mensagem }).afterClosed().subscribe(
          result => {
            this.dialogRef.close({ submit: true });
          }
        );
      }
    );
  }

  selectFile(event) {
    this.file = event.target.files;
    this.isNewFile = true;
  }

  uploadFile(quartoResponse: Quarto) {
    if (this.file.length == 0) {
      return

    }
    let file: File = this.file[0];
    this._quartoService.uploadFile(quartoResponse, file)
      .subscribe(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      )
  }
}
