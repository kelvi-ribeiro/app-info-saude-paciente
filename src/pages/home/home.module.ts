import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ExtractOneWord } from '../../pipes/extract-one-word';

@NgModule({
  declarations: [
    HomePage,
    ExtractOneWord
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
