import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
             public platform: Platform,
             public statusBar: StatusBar,
             public splashScreen: SplashScreen,
             public storageService:StorageService
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.verificaUsuarioLogado()
    });
  }
  verificaUsuarioLogado() {
    if (this.storageService.getLocalUser()) {
        this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
}
