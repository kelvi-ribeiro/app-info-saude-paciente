import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";




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
}




