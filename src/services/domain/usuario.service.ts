import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { UsuarioDTO } from "../../models/usuario.dto";


@Injectable()
export class UsuarioService {
  perfis;
  email;
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService,
    public storageService: StorageService,
    ) {
  }

  findPacienteByPessoaEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/pacientes/pessoaEmail?email=${email}`);
  }

  findPacienteByPessoaCpf(cpf: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/pacientes/pessoaCpf?cpf=${cpf}`);
  }

  findAll() {
    return this.http.get(`${API_CONFIG.baseUrl}/usuarios`);
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
  }

  getImageFromBucket(): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/${this.storageService.getUserUrlFoto()}`
    return this.http.get(url, { responseType: 'blob' });
  }
  getImageFromBucketFromUsers(urlFoto): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/${urlFoto}`
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(obj: UsuarioDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/usuarios`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post(
      `${API_CONFIG.baseUrl}/usuarios/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

    }




