import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Slides } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

import { MedicamentoService } from '../../services/domain/medicamento.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  carregou: boolean;
  medicamentos;
  dataAtual = new Date()

  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    public medicamentoService: MedicamentoService

  ) { }

  ionViewDidLoad() {
      console.log(this.dataAtual.getDate())
      this.obterMedicamentosAtivos()
    }

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
  }

  obterMedicamentosAtivos() {
    this.medicamentoService.findMedicamentosAtivosByPacienteId()
      .then(medicamentos => {
        this.calcularHoraProximoMedicamento(medicamentos)

      })
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
        if (horasRemedio[i + 1].getTime() > dataAtual.getTime()) {
          medicamento.proximaHoraMedicamento = horasRemedio[i + 1]
          break;
        }else{
          medicamento.proximaHoraMedicamento = horasRemedio[i]
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
  const oneDay = 24*60*60*1000
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
    diasRestantes = Math.round(Math.abs((this.dataAtual.getTime() - this.parseDate(medicamento.dataFim).getTime())/(oneDay)))
    medicamento.diasRestantes = `Medicamento acaba em ${diasRestantes} dias`
  });

  }
}

