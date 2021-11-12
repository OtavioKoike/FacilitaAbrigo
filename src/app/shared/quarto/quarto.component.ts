import { Albergue } from './../../models/albergue.model';
import { Quarto } from 'src/app/models/quarto.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// API
import { API } from '../../../../app.api'

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.css']
})
export class QuartoComponent implements OnInit {

  @Output() update = new EventEmitter<Quarto>();
  @Output() delete = new EventEmitter<Quarto>();
  @Input() quarto: Quarto;
  @Input() rota: string;
  @Input() dados: Albergue;

  url: string;

  constructor() {  }

  ngOnInit(): void {
    this.url = `${API}${this.quarto.imagens[this.quarto.imagens.length-1].url}`
  }

  onUpdate(){
    this.update.emit(this.quarto)
  }

  onDelete(){
    this.delete.emit(this.quarto)
  }




}
