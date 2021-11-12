import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
// Material
import { MatTableDataSource } from '@angular/material/table';
// Model
import { Usuario } from './../../../models/usuario.model';
// Service
import { EntidadeService } from './../../../services/entidade.service';


@Component({
  selector: 'app-aprovacoes-membros',
  templateUrl: './aprovacoes-membros.component.html',
  styleUrls: ['./aprovacoes-membros.component.css']
})
export class AprovacoesMembrosComponent implements OnInit {

  @Output() refreshList = new EventEmitter<boolean>();
  @Input() tipo: string;
  @Input() set membros(value: Usuario[]){
      this.dataSource = new MatTableDataSource(value);
  }

  displayedColumns: string[] = ['nome', 'email', 'cpf', 'aprovar'];
  dataSource: MatTableDataSource<Usuario>;

  constructor(
    private _entidadeService: EntidadeService
  ) {  }

  ngOnInit(): void {
  }

  Aprovar(membro){
    this._entidadeService.aprovarMembroEntidade(this.tipo, membro.id).subscribe(() => {
      this.refreshList.emit(true);
    })
  }

}
