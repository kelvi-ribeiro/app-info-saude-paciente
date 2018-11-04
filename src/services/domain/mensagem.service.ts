import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers} from '@angular/http';



@Injectable()
export class MensagemService {
  constructor(    
    public storage: StorageService,
    public handlerResponseService:HandlerResponseProvider

    ) {
  }  

  findAllPageableByPaciente(page?:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/mensagens/paciente/page?page=${page}&idPaciente=${this.storage.getUser().id}`,
        null,
        headers
      );
    });
  }
  showNumberNotReadMessageByPaciente(page?:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/mensagens/show-numbers-not-read-message?idPaciente=${this.storage.getUser().id}`,
        null,
        headers
      );
    });
  }
}