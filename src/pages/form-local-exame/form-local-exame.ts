import { ViaCepService } from './../../services/domain/viaCep.service';
import { StorageService } from './../../services/storage.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalExameService } from '../../services/domain/localExame.service';

/**
 * Generated class for the FormLocalExamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-local-exame',
  templateUrl: 'form-local-exame.html',
})
export class FormLocalExamePage {
     pacienteId: any;
     cidadeEncontrada;
     cidades = []
    formGroup:FormGroup;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public cidadeService:CidadeService,
              public formBuilder:FormBuilder,
              public storageService:StorageService,
              public localExameService:LocalExameService,
              public alertCtrl:AlertController,
              public toastCtrl:ToastController,
              public viaCepService:ViaCepService) {

        this.pacienteId = this.storageService.getPacienteId();
        this.formGroup = this.formBuilder.group({
          nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          enderecoNumero: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          enderecoLogradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          enderecoBairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          enderecoCep: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          cidadeId: [null, [Validators.required]],
          dataFim: ['', [Validators.required]],
          horaInicial: ['', [Validators.required]],
          pacienteId: [this.pacienteId]
        });
      }


  ionViewDidLoad() {
    this.obterCidades();
  }
  obterCidades(){
    this.cidadeService.findAll()
    .subscribe(res=>{
      this.cidades = res;
      this.cidadeEncontrada = null;
    })
  }
  adicionarLocal(){
    console.log('this.formGroup.value',this.formGroup.value)
    this.localExameService.insert(this.formGroup.value).subscribe(res=>{
      this.showInsertOk();
    })
  }
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Local de Exame adicionado',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{
            this.navCtrl.setRoot('LocaisExamePage')
          }
        }
      ]
    });
    alert.present();
  }
  buscarViaCep() {

    this.viaCepService.findEnderecoByCep(this.formGroup.value.enderecoCep)
    .subscribe(res=>{
      this.exibirToastEnderecoEncontrado();
      this.formGroup.controls.enderecoBairro.setValue(res['bairro']);
      this.formGroup.controls.enderecoLogradouro.setValue(res['logradouro']);
     this.cidadeEncontrada = this.cidades.find(el=>el.nome === res['localidade']);
     if(this.cidadeEncontrada){
      this.formGroup.controls.cidadeId.setValue(this.cidadeEncontrada.id);
     }
    },error=>this.exibirToastCepInvalido());

  }
  exibirToastCepInvalido() {
    let toast = this.toastCtrl.create({
      message: 'CEP Inválido',
      cssClass: "toast-error",
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

  exibirToastEnderecoEncontrado() {
    let toast = this.toastCtrl.create({
      message: 'Endereço Encontrado 😁',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
