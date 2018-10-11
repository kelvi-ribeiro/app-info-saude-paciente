import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    HomePage
    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipeModule
  ],
})
export class HomePageModule {}
