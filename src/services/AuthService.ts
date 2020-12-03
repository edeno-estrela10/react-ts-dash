import { UsuarioStatusEnum } from "../shared/enums";
import { Usuario } from "../shared/models/Usuario";

interface Response {
  token: string;
  user: Usuario;
}

export default class AuthService {

  static async signIn(username: string, password: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          token: 'jk12h3j21h3jk212h3jk12h3jkh12j3kh12k123hh21g3f12f3',
          user: {
            "id_usuario": 2,
            "nome": "Edeno Luiz Sherer",
            "usuario": "edenoscherer",
            "email": "edeno.scherer@estrela10.com.br",
            "status": UsuarioStatusEnum.ATIVO,
            "dt_cadastro": new Date("2020-06-19T13:40:57.858Z"),
            "dt_atualizacao": new Date("2020-06-19T13:40:57.858Z"),
            "permissoes": []
          },
        });
        // reject(new Error('Test'));
      }, 2000);
    });
  }
}
