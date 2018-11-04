import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeuPerfilPage } from './meu-perfil';
import { PacienteLinhaCuidadoService } from '../../services/domain/paciente.linha.cuidado.service';



@NgModule({
  declarations: [
    MeuPerfilPage,

  ],

  imports: [
    IonicPageModule.forChild(MeuPerfilPage),
  ],
  providers:[
    PacienteLinhaCuidadoService
  ]  
})
export class MeuPerfilPageModule {}
