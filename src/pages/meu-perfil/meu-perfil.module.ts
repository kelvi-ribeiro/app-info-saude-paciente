import { NgModule } from '@angular/core';
import { IonicPageModule, IonicApp } from 'ionic-angular';
import { MeuPerfilPage } from './meu-perfil';
import { PhotoViewer } from '@ionic-native/photo-viewer';



@NgModule({
  declarations: [
    MeuPerfilPage,

  ],

  imports: [
    IonicPageModule.forChild(MeuPerfilPage),
  ],
  providers:[
    PhotoViewer
  ]
})
export class MeuPerfilPageModule {}
