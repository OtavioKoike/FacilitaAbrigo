import { Albergue } from './albergue.model';
import { Caracteristica } from './caracteristica.model';
export interface Quarto {
  id: number;
  nome: string;
  descricao: string;
  capacidade: string;
  abrigo_id: number;
  caracteristicas: Caracteristica[];
  abrigo: Albergue;
  imagens: string[];
}
