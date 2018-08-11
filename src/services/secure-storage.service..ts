import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { SecureStorage, SecureStorageObject } from '../../node_modules/@ionic-native/secure-storage';
import { Platform } from '../../node_modules/ionic-angular/platform/platform';
@Injectable()
export class SecureStorageService {

  constructor(private secureStorage: SecureStorage,
              private platform:Platform) { }


  setSenha(password) {
    return this.platform.ready().then(() => {
      return this.secureStorage.create('password_user')
        .then((storage: SecureStorageObject) => {
          return storage.set(STORAGE_KEYS.password, password).catch(err => err);
        }, err => err)
    })
    }
    getSenha() {
      return this.platform.ready().then(() => {
        return this.secureStorage.create('password_user')
          .then((storage: SecureStorageObject) => {
            return storage.get(STORAGE_KEYS.password);
          }, err => err)
      })

  }
}


