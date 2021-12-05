import { ModalDadosEstadiaComponent } from './../../shared/modal-dados-estadia/modal-dados-estadia.component';
import { Usuario } from './../../models/usuario.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// Material
import { MatTableDataSource } from '@angular/material/table';
// Model
import { Estadia } from './../../models/estadia.model';
// Service
import { AuthService } from 'src/app/services/auth.service';
import { EstadiaService } from 'src/app/services/estadia.service';

@Component({
  selector: 'app-estadias',
  templateUrl: './estadias.component.html',
  styleUrls: ['./estadias.component.css']
})
export class EstadiasComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<Estadia>;
  estadias: Estadia[];

  user: Usuario;
  id: number;
  tipo: string;

  constructor(
    private dialog: MatDialog,
    private _router: Router,
    private _authService: AuthService,
    private _estadiaService: EstadiaService
  ) {
    this.user = this._authService.getUser() as Usuario;
    if (this.user.abrigo_id) {
      this.id = this.user.abrigo_id;
      this.tipo = "albergue";
      this.displayedColumns = ['nome', 'quarto', 'data_inicio', 'data_saida', 'instituicao', 'ver']
    } else {
      this.id = this.user.instituicao_id;
      this.tipo = "instituição";
      this.displayedColumns = ['nome', 'abrigo', 'quarto', 'data_inicio', 'data_saida', 'ver']
    }

    this.populaTabela();
  }

  ngOnInit(): void {
  }

  open(estadia) {
    this._router.navigate([`menu/estadia/${estadia.id}`])
  }

  onRegister() {
    this.dialog.open(ModalDadosEstadiaComponent).afterClosed().subscribe(result => {
      result.submit ? this.populaTabela() : '';
    });
  }

  private populaTabela() {
    this._estadiaService.findEstadias(this.tipo, this.id).subscribe(response => {
      let hoje = new Date();
      hoje.setHours(0,0,0,0);
      this.estadias = response.filter(estadia => new Date(estadia.data_saida) >= hoje);
      this.estadias = this.estadias.sort(function (a, b) {
        // Ordenar nome ordem data inicio
        if (a.data_inicio < b.data_inicio) {
          return -1;
        }
        else if (a.data_inicio > b.data_inicio) {
          return 1;
        }
      });
      this.dataSource = new MatTableDataSource(this.estadias);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
