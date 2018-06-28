import { StorageService } from './../../services/storage.service';
import { LocalExameService } from './../../services/domain/localExame.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ExameService } from '../../services/domain/exame.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the FormExamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-exame',
  templateUrl: 'form-exame.html',
})
export class FormExamePage {

  locaisExame: Object;
  pacienteId: any;
  formGroup:FormGroup;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public storageService:StorageService,
              public formBuilder:FormBuilder,
              public alertCtrl:AlertController,
              public exameService:ExameService,
              public localExameService:LocalExameService
              ) {

        this.pacienteId = this.storageService.getPacienteId();
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
    .subscribe(res=>{
      this.locaisExame = res;
    })
  }
  adicionarExame(){
    this.formGroup.controls.data
    .setValue(this.formGroup.value.data.concat(this.formGroup.value.exameDia,' ',this.formGroup.value.exameHora));
    this.formGroup.removeControl('exameDia');
    this.formGroup.removeControl('exameHora');
    this.exameService.insert(this.formGroup.value).subscribe(res=>{
      this.showInsertOk();
    })
  }
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Exame adicionado',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{
            this.navCtrl.setRoot('ExamesPage')
          }
        }
      ]
    });
    alert.present();
  }


}
