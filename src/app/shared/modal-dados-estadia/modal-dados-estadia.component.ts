import { PopupComponent } from './../popup/popup.component';
import { EstadiaService } from 'src/app/services/estadia.service';
import { Estadia } from './../../models/estadia.model';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from './../../models/usuario.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalDadosAbrigadoComponent } from './../../screens/abrigado/modal-dados-abrigado/modal-dados-abrigado.component';
import { startWith, map } from 'rxjs/operators';
import { AbrigadoService } from './../../services/abrigado.service';
import { Abrigado } from './../../models/abrigado.model';
import { QuartoService } from './../../services/quarto.service';
import { Quarto } from 'src/app/models/quarto.model';
import { MatTableDataSource } from '@angular/material/table';
import { Caracteristica } from './../../models/caracteristica.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modal-dados-estadia',
  templateUrl: './modal-dados-estadia.component.html',
  styleUrls: ['./modal-dados-estadia.component.css']
})
export class ModalDadosEstadiaComponent implements OnInit {

  displayedColumns: string[] = ['nome'];
  dataSource: MatTableDataSource<Quarto>;
  clickedRows = new Set<any>();

  myControl = new FormControl();
  abrigados: Abrigado[] = [];
  filteredAbrigados: Observable<Abrigado[]>;

  caracteristicasSelecionadas: Caracteristica[] = [];
  data_inicial: string;
  data_final: string;

  quarto: Quarto;
  quartos: Quarto[];
  isQuarto: boolean = false;

  abrigado = {} as Abrigado;
  user = {} as Usuario;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ModalDadosEstadiaComponent>,
    private dialog: MatDialog,
    private _authService: AuthService,
    private _quartoService: QuartoService,
    private _abrigadoService: AbrigadoService,
    private _estadiaService: EstadiaService
  ) {
    this.user = this._authService.getUser();
    if(data){
      this.quarto = data.quarto;
      this.isQuarto = true;
    }
  }

  ngOnInit(): void {
    this._abrigadoService.findAbrigados().subscribe(response => {
      this.abrigados = response;

      this.filteredAbrigados = this.myControl.valueChanges.pipe(
        startWith(null),
        map((abrigado: string | null) => (abrigado ? this._filter(abrigado) : this.abrigados.slice())),
      );
    })
  }

  atualizaChips(caract: Caracteristica[]){
    this.caracteristicasSelecionadas = caract;
  }

  filtrar(){
    const caracteristicasSelecionadasIds = this.caracteristicasSelecionadas.map(caract => { return caract.id})
    this._quartoService.filtrar(this.data_inicial, this.data_final, caracteristicasSelecionadasIds).subscribe(response => {
      this.quartos = response;
      this.dataSource = new MatTableDataSource(this.quartos);
    })
  }

  private _filter(value: string): Abrigado[] {
    const filterValue = value.toLowerCase();

    return this.abrigados.filter(abrigado => abrigado.nome.toLowerCase().includes(filterValue));
  }

  definirAbrigado(abrigado: Abrigado){
    this.abrigado = abrigado;
  }

  onSelect(row){
    this.clickedRows.clear();
    this.clickedRows.add(row);
    this.quarto = row;
  }

  openAbrigados(){
    this.dialog.open(ModalDadosAbrigadoComponent).afterClosed().subscribe(result => {
      result.submit ? this.abrigado = result.submit : '';
    });
  }

  avancar(){
    this.isQuarto = true;
  }

  agendar(){
    let estadia = {
      data_inicio: this.data_inicial,
      data_saida: this.data_final,
      quarto_id: this.quarto.id,
      abrigado_id: this.abrigado.id
    } as Estadia;

    if(this.data){
      estadia.abrigo_id = this.quarto.abrigo_id;
      estadia.instituicao_id = this.user.instituicao_id;
    } else {
      estadia.abrigo_id = this.user.abrigo_id;
    }

    this._estadiaService.createEstadia(estadia).subscribe(
      response => {

        let mensagem = { principal: "Cadastro realizado com sucesso!"}
        this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe(
          result => {
            this.dialogRef.close({ submit: response });
          }
        )
      }
    );
    //agendar
    // popup cadastro
    // fdechar modal
  }

}
