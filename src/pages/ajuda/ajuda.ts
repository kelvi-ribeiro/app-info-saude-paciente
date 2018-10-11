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
helpers = [] 


  
  
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private tts: TextToSpeech,
              private platform:Platform) {
        this.helpers.push({title:'Como cadastrar um medicamento ?',
        text:`Para cadastrar um medicamento, deve-se preencher os campos de nome, descrição, intervalo de tempo para o medicamento, data de início do medicamento, data final para o medicamento, hora inicial e tipo do medicamento. Atenção para os campos de Data inicial, final do medicamento e hora inicial, pois são com estes campos que é calculado a próxima dosagem e dias restantes do medicamento.`,expanded:false,heightText:260})

        this.helpers.push({title:'Como cadastrar um exame ?',
        text:`Para cadastrar um exame, deve-se preencher os campos de nome, descrição, dia, hora  e local do exame. Deve-se criar um local do exame, para que você possa associar seu exame à algum local`,expanded:false,heightText:150})

        this.helpers.push({title:'Como cadastrar um Local  ?',
        text:`Para cadastrar local, deve-se preencher os campos de nome, CEP, Número de endereço do local. A partir de um CEP válido, iremos achar o seu endereço.`,expanded:false,heightText:135})
  }
 
  helpSound(helSoundText){   
    this.platform.ready()
    .then(()=>{
      const options:TTSOptions = {
        text:helSoundText,
        locale:'pt-BR'
      }
      this.tts.speak(options)
    })  
  }
  


expandItem(item){  
item.expanded = item.expanded ? false:true
} 
  

}
