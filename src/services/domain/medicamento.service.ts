import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Observable } from "rxjs/Observable";




@Injectable()
export class MedicamentoService {

  constructor(
    public http: HttpClient,
    public storage: StorageService
    ) {
  }

  findMedicamentosAtivosByPacienteId() {
    let pacienteId = this.storage.getPacienteId()
    return this.http.get(`${API_CONFIG.baseUrl}/medicamentos/ativos?idPaciente=${pacienteId}`);
  }

  findMedicamentosInativosByPacienteId() {
    let pacienteId = this.storage.getPacienteId()
    return this.http.get(`${API_CONFIG.baseUrl}/medicamentos/inativos?idPaciente=${pacienteId}`);
  }
  insert(medicamento) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/medicamentos`,
      medicamento,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  delete(id):Observable<any>{
    return this.http.delete(`${API_CONFIG.baseUrl}/medicamentos/${id}`)
  }
  update(medicamento,id) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/medicamentos/${id}`,
      medicamento,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  setAtivo(id) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/medicamentos/setAtivo/${id}`,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  setInativo(id) {
    return this.http.put(
      `${API_CONFIG.baseUrl}/medicamentos/setInativo/${id}`,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}




