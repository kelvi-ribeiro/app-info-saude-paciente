
import { NotificacoesService } from './../services/domain/notificacoes.service';
import { LocalExameService } from './../services/domain/localExame.service';
import { LoginPage } from './../pages/login/login';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioService } from '../services/domain/usuario.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageUtilService } from '../services/image-util.service';
import { MedicamentoService } from '../services/domain/medicamento.service';
import { ExameService } from '../services/domain/exame.service';
import { UtilsService } from '../services/domain/utils.service';
import { KeychainTouchId } from '@ionic-native/keychain-touch-id';
import { SecureStorageService } from '../services/secure-storage.service';
import { SecureStorage } from '@ionic-native/secure-storage';
 import { HandlerResponseProvider } from '../services/handler-response/handler-response';
import { Camera } from '@ionic-native/camera';

import { PopoverMeuPerfilPage } from '../popovers/popover-meu-perfil/popover-meu-perfil';
import { PopoverExamesPage } from '../popovers/popover-exames/popover-exames';
import {NativePageTransitions} from '@ionic-native/native-page-transitions'
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { NativeRingtones } from '@ionic-native/native-ringtones';
import { PipeModule } from '../pipes/pipe.module';
import { MensagemService } from '../services/domain/mensagem.service';
import { Vibration } from '@ionic-native/vibration';

@NgModule({
  declarations: [
    MyApp,    
    LoginPage,    
    PopoverMeuPerfilPage,
    PopoverExamesPage,    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    PipeModule
    
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    LoginPage,
    PopoverMeuPerfilPage,
    PopoverExamesPage,    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
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
    Camera,
    TextToSpeech,
    NativeRingtones,
    MensagemService,
    Vibration
  ]
})
export class AppModule {}
