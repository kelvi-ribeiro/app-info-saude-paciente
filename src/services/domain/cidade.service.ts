
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../../config/api.config';
import { CidadeDTO } from '../../models/cidade.dto';

@Injectable()
export class CidadeService{
  constructor(public http:HttpClient){

  }
  findAll():Observable<CidadeDTO[]>{
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/cidades`);
  }
}
