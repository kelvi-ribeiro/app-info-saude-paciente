import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { Observable } from "rxjs/Observable";



@Injectable()
export class LocalExameService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService,
    public storageService: StorageService,
    ) {
  }

  findAllLocaisExameByPacienteId() {
    let pacienteId = this.storage.getPacienteId()
    return this.http.get(`${API_CONFIG.baseUrl}/locaisExame?idPaciente=${pacienteId}`);
  }

  insert(localExame) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/locaisExame`,
      localExame,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
  delete(id):Observable<any>{
    return this.http.delete(`${API_CONFIG.baseUrl}/locaisExame/${id}`)
  }
  update(localExame,id) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/locaisExame/${id}`,
      localExame,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
