import { Quarto } from 'src/app/models/quarto.model';
import { Entidade } from './entidade.model';
export interface Albergue extends Entidade {
  descricao: string;
  quartos: Quarto[];
}
