import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocaisExamePage } from './locais-exame';
import { LocalExameService } from '../../services/domain/localExame.service';

@NgModule({
  declarations: [
    LocaisExamePage,
  ],
  imports: [
    IonicPageModule.forChild(LocaisExamePage),
  ],
  providers:[
    LocalExameService
  ]
})
export class LocaisExamePageModule {}
