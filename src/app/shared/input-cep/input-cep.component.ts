import { Entidade } from './../../models/entidade.model';
import { CepService } from './../../services/cep.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input-cep',
  templateUrl: './input-cep.component.html',
  styleUrls: ['./input-cep.component.css']
})
export class InputCepComponent implements OnInit {

  @Output() dadosCpf = new EventEmitter<any>();
  @Input() set cep(value: string){
    this.dados.cep = value;
}

  dados = {} as Entidade

  constructor(
    private _cepService: CepService
  ) { }

  ngOnInit(): void {
  }

  onFind(cep: string){
    var padrao = /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/;

    if(!padrao.test(cep.trim())){
      return
    }

    this._cepService.Find(cep)
    .subscribe(data => this.ConvertCepJson(data));
  }

  ConvertCepJson(cepJson){
    this.dados.cep = cepJson.cep;
    this.dados.cidade = cepJson.localidade
    this.dados.bairro = cepJson.bairro;
    this.dados.rua = cepJson.logradouro;

    this.dadosCpf.emit(this.dados);
  }

}
