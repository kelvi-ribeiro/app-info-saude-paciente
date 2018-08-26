import { UsuarioService } from './../../services/domain/usuario.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Slides } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
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
  // Método que calcula o horário do medicamento mais próximo
  calcularHoraProximoMedicamento(medicamentos) {
        medicamentos.forEach(medicamento => {

          const horasRemedio:Date[]  = []
          const data = new Date()
          data.setHours(medicamento.horaInicial.substr(0, 2), medicamento.horaInicial.substr(3, 5))
          const comparadorMedicamentoHoraInicial = new Date()
          comparadorMedicamentoHoraInicial.setHours(medicamento.horaInicial.substr(0, 2), medicamento.horaInicial.substr(3, 5))
          do {
            horasRemedio.push(new Date(data.setTime(data.getTime() + (medicamento.intervaloTempo * 60 * 60 * 1000))))
          } while ((data.getHours() !== comparadorMedicamentoHoraInicial.getHours()))
          const dataAtual = new Date()

          let tempData = new Date(horasRemedio[0].getTime())
          //console.log('HorasRemedio',horasRemedio)
          for(let i = 0;i <horasRemedio.length;i++){
            console.log('see',horasRemedio[i].getMilliseconds());

            console.log('horasRemedio',horasRemedio[i].getTime())
            console.log('dataAtual',dataAtual.getTime())
              if(dataAtual.getTime() > horasRemedio[i].getTime() && tempData.getTime() <  horasRemedio[i].getTime()){
                tempData = horasRemedio[i]
            }
          }
          medicamento.proximaHoraMedicamento = tempData
          console.log('HorasRemedio',horasRemedio)
        });
        this.medicamentos = medicamentos
        // horasRemedio.forEach(horaRemedio => {
        //   tempHora = horaRemedio;
        //   console.log('see',horaRemedio.getTime())
        //   if(horaRemedio.getTime()  <= tempHora.getTime() && dataAtual.getTime() < horaRemedio.getTime()){
        //     console.log('Chegou aqui',horaRemedio)
        //   }

        // });


      //   horasRemedio.forEach(data => {
      //     if (tempHora >= data.getHours() - horaAtual.getHours()) {
      //       medicamento.proximaHoraMedicamento = data
      //       tempHora = data.getHours() - horaAtual.getHours()
      //     }
      //   })
      // });


  }
}

