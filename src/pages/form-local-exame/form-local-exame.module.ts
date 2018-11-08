import { ViaCepService } from './../../services/domain/viaCep.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormLocalExamePage } from './form-local-exame';
import { GoogleMapsService } from '../../services/google-maps/google.maps.service';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FormLocalExamePage,
  ],
  imports: [
    IonicPageModule.forChild(FormLocalExamePage),
    ComponentsModule
  ],
  providers:[
    CidadeService,
    ViaCepService,
    GoogleMapsService,
    
  ]
})
export class FormLocalExamePageModule {}
