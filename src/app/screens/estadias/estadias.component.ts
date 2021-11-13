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
    // this.dialog.open().afterClosed().subscribe( result => {
    //   result.submit ? this.populaTabela() : '';
    // });
  }

  private populaTabela() {
    this._estadiaService.findEstadias(this.tipo, this.id).subscribe(response => {
      this.estadias = response.sort();
      this.dataSource = new MatTableDataSource(this.estadias);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
