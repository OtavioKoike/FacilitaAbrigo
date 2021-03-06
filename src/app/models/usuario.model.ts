import { Albergue } from './albergue.model';
import { Entidade } from './entidade.model';
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  sexo: string;
  data_de_nascimento: any;
  role: number;
  abrigo_id: number;
  instituicao_id: number;
  senha: string;
  abrigo: Albergue;
  instituicao: Entidade;
}
