import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";




@Injectable()
export class ExameService {

  constructor(
    public http: HttpClient,
    public storage: StorageService
    ) {
  }

  findExamesByPacienteId() {
    let pacienteId = this.storage.getPacienteId()
    return this.http.get(`${API_CONFIG.baseUrl}/exames?idPaciente=${pacienteId}`);
  }
  insert(exame) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/exames`,
      exame,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}




