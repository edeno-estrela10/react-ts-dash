import { UsuarioStatusEnum } from "../enums";
import { UsuarioPermissao } from "./UsuarioPermissao";

export interface Usuario {
  id_usuario: number;
  nome: string;
  usuario: string;
  email: string;
  status: UsuarioStatusEnum;
  dt_cadastro: Date;
  dt_atualizacao: Date;
  permissoes: UsuarioPermissao[];
}
