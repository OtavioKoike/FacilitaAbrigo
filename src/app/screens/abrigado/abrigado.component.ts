import { Router } from '@angular/router';
import { ModalDadosAbrigadoComponent } from './modal-dados-abrigado/modal-dados-abrigado.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// Material
import { MatTableDataSource } from '@angular/material/table';
// Model
import { Abrigado } from './../../models/abrigado.model';
// Service
import { AbrigadoService } from './../../services/abrigado.service';

@Component({
  selector: 'app-abrigado',
  templateUrl: './abrigado.component.html',
  styleUrls: ['./abrigado.component.css']
})
export class AbrigadoComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'documento', 'telefone', 'data_de_nascimento', 'ver'];
  dataSource: MatTableDataSource<Abrigado>;
  abrigados: Abrigado[];

  constructor(
    private dialog: MatDialog,
    private _router: Router,
    private _abrigadoService: AbrigadoService
  ) { this.populaTabela(); }

  ngOnInit(): void {
  }

  open(abrigado) {
    this._router.navigate([`menu/abrigado/${abrigado.id}`])
  }

  onRegister() {
    this.dialog.open(ModalDadosAbrigadoComponent).afterClosed().subscribe(result => {
      result.submit ? this.populaTabela() : '';
    });
  }

  private populaTabela() {
    this._abrigadoService.findAbrigados().subscribe(response => {
      this.abrigados = response.sort(function (a, b) {
        // Ordenar nome ordem alfabetica
        if (a.nome < b.nome) {
          return -1;
        }
        else if (a.nome > b.nome) {
          return 1;
        }
      });
      this.dataSource = new MatTableDataSource(this.abrigados);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
