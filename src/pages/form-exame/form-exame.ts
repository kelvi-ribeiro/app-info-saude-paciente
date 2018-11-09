import { UtilsService } from './../../services/domain/utils.service';
import { NotificacoesService } from './../../services/domain/notificacoes.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ExameService } from '../../services/domain/exame.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalExameService } from '../../services/domain/localExame.service';


@IonicPage()
@Component({
  selector: 'page-form-exame',
  templateUrl: 'form-exame.html',
})
export class FormExamePage {
  exame;
  locaisExame: Object;
  pacienteId: any;
  formGroup:FormGroup;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public storageService:StorageService,
              public formBuilder:FormBuilder,
              public notificacoesService:NotificacoesService,
              public exameService:ExameService,
              public localExameService:LocalExameService,
              public utilsService:UtilsService,
              public events:Events
              ) {
        this.exame = this.navParams.get('item');        
        this.pacienteId = this.storageService.getUser().id;
        this.formGroup = this.formBuilder.group({
          nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(140)]],
          exameDia: ['', [Validators.required]],
          exameHora: ['',],
          data: ['', ],
          localExameId: [null, [Validators.required]],
          pacienteId: [this.pacienteId]
        });
      }


  ionViewDidLoad() {
    this.obterLocaisExame();
  }
  obterLocaisExame(){
    this.localExameService.findAllLocaisExameByPacienteId()
    .then(res=>{
      if(res.length === 0){
        this.notificacoesService
        .presentToast(
          'Você deve ter pelo menos um local de exame, cadastre um local de exame. redirecionando....',
          'toast-attention',
          5000,
          'bottom')
          setTimeout(() => {
            this.navCtrl.setRoot('FormLocalExamePage')            
          }, 3000);
          return;
      }
      this.locaisExame = res;
      this.verificaUpdate();
    })
  }
  adicionarExame(){
    if(!this.exame){
      this.salvarExame()
    }else{
      this.atualizarExame()
    }

  }
  salvarExame(){
    this.formGroup.controls.data
    .setValue(this.formGroup.value.data.concat(this.formGroup.value.exameDia,' ',this.formGroup.value.exameHora));
    this.formGroup.removeControl('exameDia');
    this.formGroup.removeControl('exameHora');
    this.exameService.insert(this.formGroup.value).then(res=>{
      this.notificacoesService.presentAlertDefault('Sucesso!','Exame Adicionado',null,this.navCtrl)
      this.events.publish('exames:refresh')
      
    })
  }
  atualizarExame(){
    this.formGroup.controls.data
    .setValue(this.formGroup.value.data.concat(this.formGroup.value.exameDia,' ',this.formGroup.value.exameHora));
    this.formGroup.removeControl('exameDia');
    this.formGroup.removeControl('exameHora');
    this.exameService.update(this.formGroup.value,this.exame.id).then(res=>{
      this.notificacoesService.presentAlertDefault('Sucesso!','Exame Atualizado',null,this.navCtrl)
      this.events.publish('exames:refresh')
      
    })

  }

  verificaUpdate(){
    if(this.exame){
      this.formGroup.controls.nome.setValue(this.exame.nome);
      this.formGroup.controls.descricao.setValue(this.exame.descricao);
      this.formGroup.controls.exameDia
      .setValue(this.utilsService.brazilianTimeToDate(this.exame.data));
      this.formGroup.controls.exameHora
      .setValue(this.utilsService.dateTimeToTime(this.exame.data));
      this.formGroup.controls.localExameId.setValue(this.exame.localExameId);
      this.formGroup.controls.pacienteId.setValue(this.exame.pacienteId);

     }
  }


}
