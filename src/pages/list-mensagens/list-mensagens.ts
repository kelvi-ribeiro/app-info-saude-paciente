import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { InteracaoService } from '../../services/domain/interacao.service';

@IonicPage()
@Component({
  selector: 'page-list-mensagens',
  templateUrl: 'list-mensagens.html',
})
export class ListMensagensPage {
  mensagens = [];
  carregou;
  page = 0;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public mensagemService:MensagemService,
              public intercaoService:InteracaoService) {
  }

  ionViewDidLoad() {    
    this.carregou = false;
    this.findAll('onlyRefresh')
  }
  findAll(typeRefresh){
    return this.mensagemService.findAllPageableByPaciente(this.page)
    .then(res =>{
      if(typeRefresh == 'onlyRefresh'){
        this.mensagens = res.content
      }else{
        this.mensagens.push(...res.content);
      }
      this.carregou = true
    }).catch(() => {
      this.carregou = true
    })
  }
  exibirTipoMensagem(mensagem){
    if(mensagem.linhaCuidadoId){
      return `Linha de Cuidado`
    }else if(mensagem.pacienteId){
      return 'Individual'
    }else{
      return 'Global'
      }
    }
    goToDetalhes(mensagem) {      
      this.navCtrl.push('DetalhesMensagemPage', { mensagem: mensagem });
    }
    doRefresh(refresher){
      this.findAll('onlyRefresh').then(()=>{
        refresher.complete();
      });
    }
    doInfinite(infiniteScroll){
      this.page++;
      this.findAll('infiniteScroll')
      .then(()=>{
        infiniteScroll.complete();
      })      
    }
  }

