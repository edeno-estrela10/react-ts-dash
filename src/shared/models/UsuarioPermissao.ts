import { UsuarioPermissoesEnum } from "../enums";

export interface UsuarioPermissao {
  id_usuario: number,
  permissao: UsuarioPermissoesEnum;
}
