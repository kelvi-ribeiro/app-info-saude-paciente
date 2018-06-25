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
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.salvarInformacoesPaciente()

    }

    salvarInformacoesPaciente(){
      this.usuarioService.findPacienteByPessoaEmail(this.storage.getLocalUser().email)
      .subscribe(res=>{
        this.storage.setPacienteId(res['id']);
      })
    }

    logout() {
        this.storage.setLocalUser(null);
        this.storage.setUserPerfil(null);
        this.storage.setUserName(null);
        this.storage.setUserFunction(null);
        this.storage.setUserUrlFoto(null);
        this.storage.setPacienteId(null);

    }
}
