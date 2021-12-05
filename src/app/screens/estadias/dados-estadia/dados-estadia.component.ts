import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Material
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
// Component
import { PopupComponent } from './../../../shared/popup/popup.component';
// Model
import { Estadia } from './../../../models/estadia.model';
import { Usuario } from './../../../models/usuario.model';
// Service
import { AuthService } from './../../../services/auth.service';
import { EstadiaService } from './../../../services/estadia.service';
import { Evento } from 'src/app/models/evento.model';

@Component({
  selector: 'app-dados-estadia',
  templateUrl: './dados-estadia.component.html',
  styleUrls: ['./dados-estadia.component.css']
})
export class DadosEstadiaComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<Evento>;

  user: Usuario;
  dados = { } as Estadia;
  eventos: Evento[];

  tipo: string;
  id: number;
  edit = false;

  evento: string;

  constructor(
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _estadiaService: EstadiaService,
  ) {
    this.user = this._authService.getUser() as Usuario;
    if(this.user.abrigo_id) {
      this.tipo = "albergue";
      this.displayedColumns  = ['data', 'descricao', "delete"];
    } else {
      this.tipo = "instituição";
      this.displayedColumns  = ['data', 'descricao'];
    }
  }

  ngOnInit(): void {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.findEstadia();
  }

  private findEstadia(){
    this._estadiaService.findEstadiaById(this.id).subscribe(response => {
      this.dados = response;
      this.dados.data_inicio = response.data_inicio.substring(0, 10);
      this.dados.data_saida = response.data_saida.substring(0, 10);
      this.eventos = response.eventos;
      this.dataSource = new MatTableDataSource(this.eventos);
    })
    this.edit = false;
  }

  setEdit(){
    this.edit = !this.edit;
  }

  cadastrar(){
    this._estadiaService.createEvento(this.id, this.evento).subscribe(() => {
      this.findEstadia()
      this.evento = '';
    })
  }

  deletar(evento: Evento){
    let mensagem = { principal: "Excluir Evento", secundaria: "Você tem certeza que deseja remover esse evento?", botao: "Confirmar"}
    this.dialog.open(PopupComponent, {data:  mensagem }).afterClosed().subscribe( result => {
      if(result.submit){
        this._estadiaService.deleteEvento(evento).subscribe(() => {
          this.findEstadia()
        })
      }
    });

  }

  async onSave(){
    this._estadiaService.updateEstadia(this.dados).subscribe(
      response => {
        let mensagem = { principal: "Atualização realizada com sucesso!", secundaria: "", botao: "Fechar"}
        this.dialog.open(PopupComponent, {data:  mensagem });
      }
    );
    this.edit = false;
  }

}
