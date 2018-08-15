import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './../storage.service';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout'
import { Observable } from 'rxjs/Observable';
import { TimeoutError } from 'rxjs/util/TimeoutError'


import { Token } from '../../models/token';

@Injectable()
export class HandlerResponseProvider {

  constructor(
    public http: Http,
    public storage: StorageService,
    private events: Events) {
  }
  handlerResponse(method, url, payload?, headers?):Promise<any> {
    let response;
    if (method === 'get') {
      response = this.http[method](url, {headers:headers})
    } else {
      response = this.http[method](url, payload, { headers: headers })
    }
    return response
      .map(res => {
        if(res && res._body === "")
          return new Observable();
        else
          return this.handlerSuccess(null, res.json());
      })
      .timeout(16000)
      .toPromise()
      .catch(err => {throw this.handlerError(err, method, url, payload, headers)})
  }

  handlerSuccess(response, res) {
    return res;
  }
  handlerError(err, method, url, payload?, headers?) {
    if (err.json) {
      const erro = err.json();

      if (erro.error === 'invalid_token') {
        const newHeaders: Headers = new Headers();
        const reqHeaders: Headers = new Headers();
        let newToken: Token = new Token();
        const token =  this.storage.getUserCredentials()
        .then(token=>{
          if(!token){
            return;
          }

        })


          // return this.http.post(`${API_CONFIG.baseUrl}/oauth/token?grant_type=refresh_token&refresh_token=${token.refresh_token}`, null, { headers: newHeaders })
          //   .map(token => newToken = token.json())
          //   .toPromise()
          //   .then(() => {
          //     return this.storage.setItem(this.storage.TOKEN, newToken)
          //       .then(tk => {

          //         let response;
          //         this.events.publish("token:update", tk);
          //         reqHeaders.append('Authorization', `Bearer ${newToken.access_token}`)
          //         if (method === 'get') {
          //           response = this.http[method](url, { headers: reqHeaders })
          //         } else {
          //           response = this.http[method](url, payload, { headers: reqHeaders })
          //         }
          //         return response
          //           .map(res => res.json())
          //           .catch(err => err)
          //           .toPromise()
          //       }, err => err)
          //   }, err => err)

      } else if (erro.error === 'unauthorized'){
        return erro.error_description;
      }
    } else {
      if(err instanceof TimeoutError){
        return 'Tempo de resposta excedido, tente novamente.';
      }
      return err
    }
  }

}