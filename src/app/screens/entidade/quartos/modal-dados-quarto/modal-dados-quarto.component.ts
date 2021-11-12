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

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [];
  CaractCtrl = new FormControl();

  filteredCaracteristicas: Observable<string[]>;
  caracteristicasSelecionadas: Caracteristica[] = [];
  allCaracteristicas: string[];
  allCaracteristicasObj: Caracteristica[];

  @ViewChild('CaractInput') CaractInput: ElementRef<HTMLInputElement>;

  quarto = {} as Quarto;
  file;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalDadosQuartoComponent>,
    private _caracteristicaService: CaracteristicasService,
    private _authService: AuthService,
    private _quartoService: QuartoService
  ) {
    if(data){
      this.quarto = data.quarto;
      this.caracteristicasSelecionadas = data.quarto.caracteristicas;
    }

    this._caracteristicaService.find().subscribe(response => {
      this.allCaracteristicasObj = response;
      this.allCaracteristicas = response.map(caracteristica => caracteristica.nome);

      this.filteredCaracteristicas = this.CaractCtrl.valueChanges.pipe(
        startWith(null),
        map((caracteristica: string | null) => (caracteristica ? this._filter(caracteristica) : this.allCaracteristicas.slice())),
      );
    })

  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    return ;
  }

  remove(caracteristica: Caracteristica): void {
    const index = this.caracteristicasSelecionadas.indexOf(caracteristica);
    if (index >= 0) {
      this.caracteristicasSelecionadas.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let caracteristicaObj = this.allCaracteristicasObj.filter(caract => caract.nome === event.option.viewValue)
    this.caracteristicasSelecionadas.push(caracteristicaObj[0])
    this.CaractInput.nativeElement.value = '';
    this.CaractCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCaracteristicas.filter(caracteristica => caracteristica.toLowerCase().includes(filterValue));
  }

  onCreate() {
    const user = this._authService.getUser();
    this.quarto.abrigo_id = user.abrigo_id;

    if(this.data){
      this._quartoService.update(this.quarto).subscribe(
        response => {
          let mensagem = { principal: "Atualização realizada com sucesso!" };
          this.onCreateCaracteristicas(this.quarto, mensagem);
          this.uploadFile(this.quarto);
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
  }

  uploadFile(quartoResponse: Quarto) {
    if (this.file.length == 0) {
      console.log("No file selected!");
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
