import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Http, Headers } from '@angular/http';




@Injectable()
export class MedicamentoService {

  constructor(
    public http: Http,
    public storage: StorageService,
    public storageService: StorageService,
    public handlerResponseService:HandlerResponseProvider
    ) {
  }


  findMedicamentosAtivosByPacienteId() {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      let pacienteId = this.storage.getUser().id
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/medicamentos/ativos?idPaciente=${pacienteId}`,
        null,
        headers
      );
    });
  }

  findMedicamentosInativosByPacienteId() {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      let pacienteId = this.storage.getUser().id
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/medicamentos/inativos?idPaciente=${pacienteId}`,
        null,
        headers
      );
    });
  }
  insert(medicamento) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/medicamentos`,
        medicamento,
        headers
      );
    });
  }

  delete(id){
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "delete",
        `${API_CONFIG.baseUrl}/medicamentos/${id}`,
        null,
        headers
      );
    });
  }
  update(medicamento,id) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/medicamentos/${id}`,
        medicamento,
        headers
      );
    });
  }

  setAtivo(id) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/medicamentos/setAtivo/${id}`,
        null,
        headers
      );
    });
  }

  setInativo(id) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/medicamentos/setInativo/${id}`,
        null,
        headers
      );
    });
  }
}




