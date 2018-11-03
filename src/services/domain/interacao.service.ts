import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers} from '@angular/http';



@Injectable()
export class InteracaoService {
  constructor(    
    public storage: StorageService,
    public handlerResponseService:HandlerResponseProvider

    ) {
  }  
  
  findByPacienteIdAndMensagemId(idMensagem:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/interacoes/find-by-paciente-mensagem?idPaciente=${this.storage.getUser().id}&idMensagem=${idMensagem}`,
        null,
        headers
      );
    });
  }
  insert(idMensagem) {
    const interacaoDTO = {
      pacienteId:this.storage.getUser().id,
      mensagemId:idMensagem
    }
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/interacoes`,
        interacaoDTO,
        headers
      );
    });
  }

}