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

  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    public medicamentoService: MedicamentoService

  ) { }

  ionViewDidLoad() {
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
        horasRemedio.push(new Date(data.setTime(data.getTime() + (medicamento.intervaloTempo * 60 * 60 * 1000))))
      } while ((data.getHours() !== comparadorMedicamentoHoraInicial.getHours()))
      const dataAtual = new Date()

      for (let i = 0; i < horasRemedio.length; i++) {


        if (horasRemedio[i].getTime() > dataAtual.getTime()) {
          medicamento.proximaHoraMedicamento = horasRemedio[i + 1]
          break;
        }
      }
    });
    this.medicamentos = medicamentos
  }
}

