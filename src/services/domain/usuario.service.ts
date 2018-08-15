import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { UsuarioDTO } from "../../models/usuario.dto";
import { Http, Headers } from '@angular/http';



@Injectable()
export class UsuarioService {
  perfis;
  email;
  constructor(
    public http: Http,
    public storage: StorageService,
    public imageUtilService: ImageUtilService,
    public storageService: StorageService,
    public handlerResponseService:HandlerResponseProvider
    ) {
  }

//   findPacienteByPessoaEmail(email: string) {
//     let headers = new Headers();
//     headers.append("Authorization", `Bearer ${this.storage.getUserCredentials().token}`);
//     return this.handlerResponseService.handlerResponse(
//       "get",
//       `${API_CONFIG.baseUrl}/pacientes/pessoaEmail=${email}`,
//       null,
//       headers
//     );
// }

  findPacienteByPessoaCpf(cpf: string) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      console.log(headers.get('Authorization'))
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/pacientes/pessoaCpf?cpf=${cpf}`,
        null,
        headers
      );
    })
  }

  findAll() {
    return this.http.get(`${API_CONFIG.baseUrl}/usuarios`);
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
  }

  // getImageFromBucket(): Observable<any> {
  //   let url = `${API_CONFIG.bucketBaseUrl}/${this.storageService.getUserUrlFoto()}`
  //   return this.http.get(url, { responseType: 'blob' });
  // }
  // getImageFromBucketFromUsers(urlFoto): Observable<any> {
  //   let url = `${API_CONFIG.bucketBaseUrl}/${urlFoto}`
  //   return this.http.get(url, { responseType: 'blob' });
  // }

  // insert(obj: UsuarioDTO) {
  //   return this.http.post(
  //     `${API_CONFIG.baseUrl}/usuarios`,
  //     obj,
  //     {
  //       observe: 'response',
  //       responseType: 'text'
  //     }
  //   );
  // }

  // uploadPicture(picture) {
  //   let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
  //   let formData: FormData = new FormData();
  //   formData.set('file', pictureBlob, 'file.png');
  //   return this.http.post(
  //     `${API_CONFIG.baseUrl}/usuarios/picture`,
  //     formData,
  //     {
  //       observe: 'response',
  //       responseType: 'text'
  //     }
  //   );
  // }

    }




