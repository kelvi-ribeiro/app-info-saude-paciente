import { UsuarioService } from './domain/usuario.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';
import { CreadenciaisDTO } from "../models/credenciais.dto";



@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient,
                public storage: StorageService,
                public usuarioService:UsuarioService

                ) {
    }

    authenticate(creds : CreadenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            cpf: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setUserCredentials(user)
        return this.obterDadosPerfil();
    }

    logout() {
        this.storage.limparStorage();

    }
    obterDadosPerfil(){
      return this.usuarioService.findPacienteByPessoaCpf().then(res=>{
        this.setUser(res);
      })
    }
    setUser(res){
      let pessoa = res['pessoa']
      let user;
      user = {
        id:res['id'],
          pessoa:{
            nome:pessoa.nome,
            cpf:pessoa.cpf,
            dataInclusao:pessoa.dataInclusao,
            email:pessoa.email,
            raca:pessoa.raca,
            rg:pessoa.rg,
            sexo:pessoa.sexo,
            urlFoto:pessoa.urlFoto,
            endereco:{
              id:pessoa.endereco.id,
              numero:pessoa.endereco.numero,
              logradouro:pessoa.endereco.logradouro,
              bairro:pessoa.endereco.bairro,
              cep:pessoa.endereco.cep,
              cidade:{id:pessoa.endereco.cidadeid,nome:pessoa.endereco.cidade.nome}
            },

            naturalidade:{
              id:pessoa.naturalidade.id,
              naturalidade:pessoa.naturalidade.naturalidade
            }
          }
        }
      this.storage.setUser(user);
    }

}
