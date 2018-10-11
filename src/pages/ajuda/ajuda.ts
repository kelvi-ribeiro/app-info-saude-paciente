import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech';

/**
 * Generated class for the AjudaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajuda',
  templateUrl: 'ajuda.html',
})
export class AjudaPage {
  helpSoundTextMedicamento = `Para cadastrar um medicamento, deve-se preencher os campos de nome, descrição, intervalo de tempo para o medicamento, data de início do medicamento, data final para o medicamento, hora inicial e tipo do medicamento, Atenção para os campos de Data inicial, final do medicamento e hora inicial, pois são com estes campos que é calculado a próxima dosagem e dias restantes do medicamento.`
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private tts: TextToSpeech,
              private platform:Platform) {
  }
 
  helpSound(helSoundText){
    console.log(helSoundText)
    this.platform.ready()
    .then(()=>{
      const options:TTSOptions = {
        text:helSoundText,
        locale:'pt-BR'
      }
      this.tts.speak(options)
    })  
  }

}
