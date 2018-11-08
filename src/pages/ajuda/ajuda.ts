import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech';


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
        this.helpers.push({title:'Cadastro de medicamento',
        text:`Para cadastrar um medicamento, deve-se preencher os campos de nome, descrição, intervalo de tempo para o medicamento, data de início do medicamento, data final para o medicamento, hora inicial e tipo do medicamento. Atenção para os campos de Data inicial, final do medicamento e hora inicial, pois são com estes campos que é calculado a próxima dosagem e dias restantes do medicamento.`,expanded:false,heightText:260,playing:false})

        this.helpers.push({title:'Cadastro de exame',
        text:`Para cadastrar um exame, deve-se preencher os campos de nome, descrição, dia, hora  e local do exame. Deve-se criar um local do exame, para que você possa associar seu exame à algum local`,expanded:false,heightText:150,playing:false})

        this.helpers.push({title:'Cadastro de local de exame',
        text:`Para cadastrar local de exame, deve-se preencher os campos de nome, CEP, Número de endereço do local. A partir de um CEP válido, iremos achar o seu endereço.`,expanded:false,heightText:135,playing:false})

        this.helpers.push({title:'Sobre as mensagens',
        text:`Mensagens enviados pelos profissionais de saúde, ficam disponíveis na tela de listagem de mensagens, além disso, também é enviado um email contendo as informações da mensagem, isso se mensagem for direcionada para todos os pacientes, alguma linha de cuidado de você participe ou individual`,expanded:false,heightText:200,playing:false})
  }
 
  helpSound(helper){   
    this.platform.ready()
    .then(()=>{
      const options:TTSOptions = {
        text:helper.text,
        locale:'pt-BR'
      }
      helper.playing = true;
      this.tts.speak(options)
      .then(()=>{
        helper.playing = false;
      })
    })  
  }
  stopSound(helper){    
    this.platform.ready()
    .then(()=>{
      this.tts.speak("")
      .then(()=>{
        helper.playing = false
      })      
    })    
  }
  


expandItem(item){  
item.expanded = item.expanded ? false:true
} 
  

}
