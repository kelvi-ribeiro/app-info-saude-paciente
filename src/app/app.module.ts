import { NotificacoesService } from './../services/domain/notificacoes.service';
import { LocalExameService } from './../services/domain/localExame.service';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';




import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../services/domain/usuario.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageUtilService } from '../services/image-util.service';
import { MedicamentoService } from '../services/domain/medicamento.service';
import { ExameService } from '../services/domain/exame.service';
import { UtilsService } from '../services/domain/utils.service';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { SecureStorageService } from '../services/secure-storage.service.';
import { SecureStorage } from '@ionic-native/secure-storage';
 import { HandlerResponseProvider } from '../services/handler-response/handler-response';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    UsuarioService,
    ImageUtilService,
    MedicamentoService,
    LocalExameService,
    ExameService,
    NotificacoesService,
    UtilsService,
    KeychainTouchId,
    SecureStorageService,
    SecureStorage,
    HandlerResponseProvider,


  ]
})
export class AppModule {}
