import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MedicamentoService } from '../../services/domain/medicamento.service';
import { UtilsService } from '../../services/domain/utils.service';
import { TipoMedicamentoService } from '../../services/domain/tipo.medicamento.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';


@IonicPage()
@Component({
  selector: 'page-form-medicamento',
  templateUrl: 'form-medicamento.html',
})
export class FormMedicamentoPage {
  pacienteId;
  formGroup: FormGroup;
  medicamento;
  tiposMedicamentos: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public formBuilder: FormBuilder,
    public medicamentoService:MedicamentoService,
    public alertCtrl:AlertController,
    public utilsService:UtilsService,
    public tipoMedicamentoService:TipoMedicamentoService,
    public events:Events,
    public notificacoesService:NotificacoesService,) {

    this.medicamento =  this.navParams.get('item');
    this.pacienteId = this.storageService.getUser().id;
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      intervaloTempo: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      horaInicial: ['', [Validators.required]],
      tipoMedicamentoId: ['', [Validators.required]],
      pacienteId: [this.pacienteId]
    });
  }

  ionViewDidLoad() {
    this.obterTiposMedicamentos();
  }

  obterTiposMedicamentos(){
    this.tipoMedicamentoService.findAll()
    .then(res=>{
      this.tiposMedicamentos = res;      
      this.verificaUpdate();
    })
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
      this.notificacoesService.presentAlertDefault('Sucesso!','Medicamento Adicionado',null,this.navCtrl)
      this.events.publish('medicamentos:refresh')
    })
  }
  atualizarMedicamento(){
    this.medicamentoService.update(this.formGroup.value,this.medicamento.id).then(res=>{
      this.notificacoesService.presentAlertDefault('Sucesso!','Medicamento Atualizado',null,this.navCtrl)
      this.events.publish('medicamentos:refresh')
    })
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
      this.formGroup.controls.tipoMedicamentoId.setValue(this.medicamento.tipoMedicamentoId);
    }
  }
}
