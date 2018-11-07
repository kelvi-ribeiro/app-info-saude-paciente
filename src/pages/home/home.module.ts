import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MensagemService } from '../../services/domain/mensagem.service';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    HomePage
    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipeModule    
  ],
  providers:[
    MensagemService
  ]
})
export class HomePageModule {}
