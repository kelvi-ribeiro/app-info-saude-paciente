import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';

/**
 * Generated class for the ListMensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-mensagens',
  templateUrl: 'list-mensagens.html',
})
export class ListMensagensPage {
  mensagens = [];

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public mensagemService:MensagemService) {
  }

  ionViewDidLoad() {
    this.findAll()
  }
  findAll(){
    this.mensagemService.findAllPageableByPaciente(0)
    .then(res =>{
      this.mensagens = res.content
    })
  }
  exibirTipoMensagem(mensagem){
    if(mensagem.linhaCuidado){
      return `Linha de cuiado: ${mensagem.linhaCuidado.nome}`
    }else if(mensagem.paciente){
      return 'Individual'
    }else{
      return 'Global'
      }
    }
  }

