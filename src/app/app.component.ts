import { AuthService } from './../services/auth.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from './../pages/home/home';
import { StorageService } from './../services/storage.service';
import { Component, ViewChild } from '@angular/core';

import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  pages: PageInterface[] = [
    { title: 'Meus Medicamentos', name: 'MedicamentosPage', component: 'MedicamentosPage', tabComponent: 'MedicamentosPage', index: 0, icon: 'home' },
    { title: 'Meu Histórico', name: 'HistoricoMedicamentosPage', component: 'HistoricoMedicamentosPage', tabComponent: 'HistoricoMedicamentosPage', index: 0, icon: 'contacts' },
    { title: 'Logout', name: '', component: '', tabComponent: '', index: 0, icon: 'md-log-out' }
  ];
  @ViewChild(Nav) nav: Nav;
  constructor(
             public platform: Platform,
             public statusBar: StatusBar,
             public splashScreen: SplashScreen,
             public storageService:StorageService,
             public alertCtrl:AlertController,
             public authService:AuthService
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
  openPage(page: PageInterface) {
    if(page.title==='Logout'){
      this.alertCertezaSair();
    }
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If tabs page is already active just change the tab index
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      console.log('chegou aqui ',this.nav.getActiveChildNavs().length && page.index != undefined)
      this.nav.setRoot(page.component, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
  alertCertezaSair() {
    let alert = this.alertCtrl.create({
      title: "Logout!",
      message: "Você deseja se desconectar ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.authService.logout();
            this.nav.setRoot(LoginPage);
          }
        },
        {
          text: "Não",
          handler: () => {
            this.storageService.setEmail(null);
          }
        }
      ]
    });
    alert.present();
  }
}
