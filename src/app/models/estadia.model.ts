import { Albergue } from './albergue.model';
import { Abrigado } from './abrigado.model';
import { Entidade } from './entidade.model';
import { Quarto } from './quarto.model';
import { Evento } from './evento.model';
export interface Estadia {
  id: number;
  data_inicio: any;
  data_saida: any;
  abrigado_id: number;
  quarto_id: number;
  instituicao_id: string;
  quarto: Quarto;
  instituicao: Entidade;
  abrigado: Abrigado;
  abrigo: Albergue;
  eventos: Evento[];
}
