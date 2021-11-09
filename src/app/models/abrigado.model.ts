import { Estadia } from './estadia.model';
export interface Abrigado {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  sexo: string;
  data_de_nascimento: any;
  estadias: Estadia[];
}
