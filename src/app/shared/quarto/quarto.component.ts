import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.css']
})
export class QuartoComponent implements OnInit {

  rota: string;

  constructor() {
    this.rota = localStorage.getItem('rota');
  }

  quarto = {
    nome: "Galpão",
    descricao: "Abrigo para mulheresswfedwfewefefefgedfgefgegçlknjkerhlyr liughdlj khbvljsj hl hfdkjlhgvjkdglhslghwgipshpiuh",
    capacidade: 4,
    url: 'https://imgcy.trivago.com/c_lfill,d_dummy.jpeg,e_sharpen:60,f_auto,h_360,q_auto,w_360//itemimages/52/21/5221376_v2.jpeg',
    caracteristicas: ["mulheres", "pertences", "pet"]
  }

  ngOnInit(): void {
  }




}
