import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Slides, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

import { MedicamentoService } from '../../services/domain/medicamento.service';
import { ExameService } from '../../services/domain/exame.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('SlidesMedicamentos') slidesMedicamentos: Slides;
  @ViewChild('SlidesExames') slidesExames: Slides;

  umDia = 24*60*60*1000
  carregou: boolean;
  medicamentos;
  dataAtual = new Date();
  segmentoAtivo = 'Medicamentos';
  exames: any;

  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    public medicamentoService: MedicamentoService,
    public exameService:ExameService,
    public alertCtrl:AlertController

  ) { }

  ionViewDidLoad() {
      this.obterMedicamentosAtivos()
      this.obterExames()
    }
/* 
  handleSlide() {
    if (this.slides.isBeginning()) {
      this.slides.lockSwipeToPrev(true);
    } else {
      this.slides.lockSwipeToPrev(false);
    }

    if (this.slides.isEnd()) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);
    }
  } */

  obterMedicamentosAtivos() {
    this.medicamentoService.findMedicamentosAtivosByPacienteId()
      .then(medicamentos => {
        this.calcularHoraProximoMedicamento(medicamentos)

      })
  }
  obterExames(){
    this.exameService.findExamesByPacienteId()
    .then(exames => {
      this.exames = exames
    })
  }

  atualizar(exame){
    this.navCtrl.push('FormExamePage',{exame:exame})
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
    .then(res =>{
      this.obterExames()
    })
  }

  localizarExame(exame){    
    this.navCtrl.push('MapaLocalizacaoExamesPage',{exame:exame})
  } 
  
  // Método que calcula o horário da dosagem mais próximo
  calcularHoraProximoMedicamento(medicamentos) {
    medicamentos.forEach(medicamento => {

      let horasRemedio: Date[] = []
      const data = new Date()
      data.setHours(medicamento.horaInicial.substr(0, 2), medicamento.horaInicial.substr(3, 5))
      const comparadorMedicamentoHoraInicial = new Date()
      comparadorMedicamentoHoraInicial.setTime(data.getTime() - (medicamento.intervaloTempo * 60 * 60 * 1000))
    while (data.getHours() !== comparadorMedicamentoHoraInicial.getHours()){
      horasRemedio.push(new Date(data.setTime(data.getTime() + (medicamento.intervaloTempo * 60 * 60 * 1000))))
    }
      const dataAtual = new Date()
      if(medicamento.intervaloTempo > 4){
        horasRemedio.reverse()
      }
      for (let i = 0; i < horasRemedio.length; i++) {
        if (horasRemedio[i].getTime() > dataAtual.getTime()) {
          medicamento.proximaHoraMedicamento = horasRemedio[i]
          break;
        }else{
          medicamento.proximaHoraMedicamento = horasRemedio[i + 1]
          break;
        }

      }
    });
    this.medicamentos = medicamentos
    this.calcularDiasRestantesMedicamento()
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

  let diasRestantes
  this.medicamentos.forEach(medicamento => {
    if(this.parseDate(medicamento.dataFim).getDate() < this.dataAtual.getDate()){
      medicamento.diasRestantes = 'Medicamento já acabou'
      return
    }
    if(this.parseDate(medicamento.dataInicio).getDate() === this.dataAtual.getDate()){
      medicamento.diasRestantes = 'Medicamento acaba hoje'
      return
    }
    diasRestantes = Math.round(Math.abs((this.dataAtual.getTime() - this.parseDate(medicamento.dataFim).getTime())/(this.umDia)))
    medicamento.diasRestantes = `Medicamento acaba em ${diasRestantes} dias`
  });

  }
}

