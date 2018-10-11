import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Slides, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

import { MedicamentoService } from '../../services/domain/medicamento.service';
import { ExameService } from '../../services/domain/exame.service';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('SlidesMedicamentos') slidesMedicamentos: Slides;
  @ViewChild('SlidesExames') slidesExames: Slides;

  umDia = 24*60*60*1000
  carregou: boolean = false;
  medicamentos;
  dataAtual = new Date();
  segmentoAtivo = this.navParams.get('segmentoExame') !== undefined ? 'exames':'medicamentos';  
  exames: any;  
  

  constructor(
    public navCtrl: NavController,
    public navParams:NavParams,
    public storageService: StorageService,
    public medicamentoService: MedicamentoService,
    public exameService:ExameService,
    public alertCtrl:AlertController,
    public actionSheetCtrl: ActionSheetController,
    public events:Events,
    public nativePageTransitions:NativePageTransitions,
    private tts: TextToSpeech,
    private platform:Platform

  ) { 
    
  }

  ionViewDidLoad() {
     /*  this.platform.ready()
      .then(()=>{
        const options:TTSOptions = {
          text:'Bem vindo ao nosso app',
          locale:'pt-BR'
        }
        this.tts.speak(options)
      }) */
      this.events.subscribe('medicamentos:refresh' ,()=>{
        this.obterMedicamentosAtivos()
      })

      this.events.subscribe('exames:refresh' ,()=>{
        this.obterExames()
      })
      this.obterMedicamentosAtivos()
      
    }
    ionViewWillLeave(){
      const options: NativeTransitionOptions = {
        direction: 'up',
        duration: 500,
     
      }
      this.nativePageTransitions.fade(options)
    }

    refreshPage(){
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
    presentActionSheet() {
      const actionSheet = this.actionSheetCtrl.create({          
        buttons: [
          {
            text: 'Adicionar Medicamento',             
            icon:'flask',           
            handler: () => {
              this.navCtrl.push('FormMedicamentoPage')
            }
          },
          {
            text: 'Consultar Histórico De Medicamentos',
            icon:'book',           
            handler: () => {
              this.navCtrl.push('HistoricoMedicamentoPage')
            }
          },
          {
            text: 'Adicionar Exame',
            icon:'md-medkit',           
            handler: () => {
              this.navCtrl.push('FormExamePage')
            }
          },{
            text: 'Cancelar',            
            icon:'close',  
            handler: () => {
              
            }
          }
        ]
      });
      actionSheet.present();
    }

    alertApagarMedicamento(medicamento) {
      let alert = this.alertCtrl.create({
        title: "Atenção!",
        message: "Esta ação irá apagar esse medicamento, Tem certeza disso ?",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.apagarMedicamento(medicamento)
            }
          },
          {
            text: "Não"
          }
        ]
      });
      alert.present();
    }

    alertConcluirMedicamento(medicamento) {
      let alert = this.alertCtrl.create({
        title: "Atenção!",
        message: "Concluiu o medicamento ?",
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "Sim",
            handler: () => {
              this.setMedicamentoInativo(medicamento)
            }
          },
          {
            text: "Não"
          }
        ]
      });
      alert.present();
    }

    apagarMedicamento(medicamento){      
      this.medicamentoService.delete(medicamento.id)
      .then(() =>{       
        this.refreshPage()
      })
    }

  obterMedicamentosAtivos() {
    this.medicamentoService.findMedicamentosAtivosByPacienteId()
      .then(medicamentos => {
        this.calcularHoraProximoMedicamento(medicamentos)
        this.obterExames()        
      })
      .catch(()=>{
        this.carregou = true;
      })
  }
  atualizarMedicamento(medicamento){
    this.navCtrl.push('FormMedicamentoPage',{item:medicamento})
  }

  setMedicamentoInativo(medicamento){
    this.medicamentoService.setInativo(medicamento.id)
    .then(()=>{
      this.refreshPage()      
    })
  }
  obterExames(){
    this.exameService.findExamesByPacienteId()
    .then(exames => {
      exames.reverse()
      this.exames = exames
      this.carregou = true;
    })
    .catch(()=>{
      this.carregou = true;
    })
  }

  atualizarExame(exame){
    this.navCtrl.push('FormExamePage',{item:exame})
  }
  alertApagarExame(exame) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá apagar esse exame, Tem certeza disso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagarExame(exame)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  apagarExame(exame){
    this.exameService.delete(exame.id)
    .then(() =>{      
      this.navCtrl.setRoot(this.navCtrl.getActive().component,{segmentoExame:'segmentoExame'});
    })
  }
  localizarExame(exame){    
    this.navCtrl.push('MapaLocalizacaoExamesPage',{exame:exame})
  } 
  
  // Método que calcula o horário da dosagem mais próximo
  calcularHoraProximoMedicamento(medicamentos) {
    medicamentos.forEach(medicamento => {
      const horasRemedio: Date[] = []
      const data = new Date()
      data.setHours(medicamento.horaInicial.substr(0, 2), medicamento.horaInicial.substr(3, 5))
      const comparadorMedicamentoHoraInicial = new Date()
      comparadorMedicamentoHoraInicial.setHours(medicamento.horaInicial.substr(0, 2), medicamento.horaInicial.substr(3, 5))
      do {
        horasRemedio.push(new Date(data.setTime(data.getTime() + (medicamento.intervaloTempo * 60 * 60 * 1000)) - 86400000))
      } while ((data.getHours() !== comparadorMedicamentoHoraInicial.getHours()))
      const dataAtual = new Date()
      console.log(horasRemedio) 
      for (let i = 0; i < horasRemedio.length; i++) {
        if (horasRemedio[i].getTime() > dataAtual.getTime()) {
          medicamento.proximaHoraMedicamento = horasRemedio[i]
          break;
        }else {
          medicamento.proximaHoraMedicamento = horasRemedio[0]
        }
      }
    });
    this.medicamentos = medicamentos
    this.calcularDiasRestantesMedicamento()
    this.medicamentos.reverse()
  }

  // new Date("dateString") is browser-dependent and discouraged, so we'll write
// a simple parse function for U.S. date format (which does no error checking)
parseDate(data) {
  data = data.substr(0,10)
  const dataTratada = data.split('/');
  return new Date(dataTratada[2], dataTratada[1] - 1, dataTratada[0]);
}

calcularDiasRestantesMedicamento() {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.  
  return this.medicamentos.forEach(medicamento => {
    if(this.parseDate(medicamento.dataInicio).getTime() > this.dataAtual.getTime()){
      medicamento.diasRestantes = 'Data de Início Não Alcançada'
      return
    }
    else if(this.parseDate(medicamento.dataFim).getTime() < this.dataAtual.getTime()){
      medicamento.diasRestantes = 'Finalizado'
      return
    }
    else if(this.parseDate(medicamento.dataFim).getDate() === this.dataAtual.getDate()){
      medicamento.diasRestantes = 'Finaliza Hoje'
      return
    }    
    medicamento.diasRestantes = `${Math.round(Math.abs((this.dataAtual.getTime() - this.parseDate(medicamento.dataFim).getTime())/(this.umDia)))}`
  });
  
  
  }
}

