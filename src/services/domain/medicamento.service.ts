import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { UsuarioDTO } from "../../models/usuario.dto";


@Injectable()
export class MedicamentoService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService,
    public storageService: StorageService,
    ) {
  }

  findMedicamentosByPacienteId() {
    let pacienteId = this.storage.getPacienteId()
    return this.http.get(`${API_CONFIG.baseUrl}/medicamentos?idPaciente=${pacienteId}`);
  }
}




