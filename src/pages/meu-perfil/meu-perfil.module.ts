import { NgModule } from '@angular/core';
import { IonicPageModule, IonicApp } from 'ionic-angular';
import { MeuPerfilPage } from './meu-perfil';



@NgModule({
  declarations: [
    MeuPerfilPage,

  ],

  imports: [
    IonicPageModule.forChild(MeuPerfilPage),
  ]  
})
export class MeuPerfilPageModule {}
