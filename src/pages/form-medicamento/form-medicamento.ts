import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MedicamentoService } from '../../services/domain/medicamento.service';
import { UtilsService } from '../../services/domain/utils.service';

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
  medicamento;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public formBuilder: FormBuilder,
    public medicamentoService:MedicamentoService,
    public alertCtrl:AlertController,
    public utilsService:UtilsService) {

    this.medicamento =  this.navParams.get('medicamento');
    this.pacienteId = this.storageService.getUser().id;
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
    this.verificaUpdate();
  }

  adicionarMedicamento(){
    if(!this.medicamento){
      this.salvarMedicamento();
    }else{
      this.atualizarMedicamento();
    }
  }
  salvarMedicamento(){
    this.medicamentoService.insert(this.formGroup.value).then(res=>{
      this.showAlertSucesso('Medicamento Adicionado a Lista');
    })
  }
  atualizarMedicamento(){
    this.medicamentoService.update(this.formGroup.value,this.medicamento.id).then(res=>{
      this.showAlertSucesso('Medicamento atualizado');
    })
  }
  showAlertSucesso(message){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:message,
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
  verificaUpdate(){
    if(this.medicamento){
      this.formGroup.controls.nome.setValue(this.medicamento.nome);
      this.formGroup.controls.descricao.setValue(this.medicamento.descricao);
      this.formGroup.controls.intervaloTempo.setValue(this.medicamento.intervaloTempo);
      this.formGroup.controls.dataInicio
      .setValue(this.utilsService.brazilianTimeToDate(this.medicamento.dataInicio));
      this.formGroup.controls.dataFim
      .setValue(this.utilsService.brazilianTimeToDate(this.medicamento.dataFim));
      this.formGroup.controls.horaInicial.setValue(this.medicamento.horaInicial);
      this.formGroup.controls.pacienteId.setValue(this.medicamento.pacienteId);
    }
  }
}
