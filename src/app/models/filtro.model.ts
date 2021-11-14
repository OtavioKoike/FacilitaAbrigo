import { Caracteristica } from './caracteristica.model';
export interface Filtro {
  data_inicial: string;
  data_final: string;
  cidade: string;
  caracteristicasIds: number[];
  abrigo_id: number;
}
