import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MedicamentoService } from '../../services/domain/medicamento.service';

/**
 * Generated class for the FormMedicamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-medicamento',
  templateUrl: 'form-medicamento.html',
})
export class FormMedicamentoPage {
  pacienteId;
  formGroup: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public formBuilder: FormBuilder,
    public medicamentoService:MedicamentoService,
    public alertCtrl:AlertController) {

    this.pacienteId = this.storageService.getPacienteId();
    console.log('this.pacienteId',this.pacienteId)
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      intervaloTempo: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      horaInicial: ['', [Validators.required]],
      pacienteId: [this.pacienteId]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormMedicamentoPage');
  }

  adicionarMedicamento(){
    console.log('this.formGroup.value',this.formGroup.value)
    this.medicamentoService.insert(this.formGroup.value).subscribe(res=>{
      this.showInsertOk();      
    })
  }
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Medicamento adicionado a lista',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{
            this.navCtrl.setRoot('MedicamentosPage')
          }
        }
      ]
    });
    alert.present();
  }



}
