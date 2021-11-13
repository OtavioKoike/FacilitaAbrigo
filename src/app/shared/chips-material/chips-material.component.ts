import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
import { CaracteristicasService } from './../../services/caracteristicas.service';
import { Caracteristica } from './../../models/caracteristica.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chips-material',
  templateUrl: './chips-material.component.html',
  styleUrls: ['./chips-material.component.css']
})
export class ChipsMaterialComponent implements OnInit {

  @Input() caracteristicasSelecionadas: Caracteristica[] = [];
  @Output() selecionadas = new EventEmitter<Caracteristica[]>();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [];
  CaractCtrl = new FormControl();

  filteredCaracteristicas: Observable<string[]>;
  allCaracteristicas: string[];
  allCaracteristicasObj: Caracteristica[];

  @ViewChild('CaractInput') CaractInput: ElementRef<HTMLInputElement>;

  constructor(
    private _caracteristicaService: CaracteristicasService
  ) {

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
      this.selecionadas.emit(this.caracteristicasSelecionadas);

    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let caracteristicaObj = this.allCaracteristicasObj.filter(caract => caract.nome === event.option.viewValue)
    this.caracteristicasSelecionadas.push(caracteristicaObj[0])
    this.selecionadas.emit(this.caracteristicasSelecionadas);
    this.CaractInput.nativeElement.value = '';
    this.CaractCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCaracteristicas.filter(caracteristica => caracteristica.toLowerCase().includes(filterValue));
  }

}
