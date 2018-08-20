import { ViaCepService } from './../../services/domain/viaCep.service';
import { StorageService } from './../../services/storage.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalExameService } from '../../services/domain/localExame.service';
import { GoogleMapsService } from '../../services/google-maps/google.maps.service';

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
    localExame;
    cidadeEncontrada;
    cidades = [];
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
              public viaCepService:ViaCepService,
              public googleMapsService:GoogleMapsService)
               {
        this.localExame = this.navParams.get('localExame')
        this.pacienteId = this.storageService.getUser().id;
        this.formGroup = this.formBuilder.group({
          nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          enderecoNumero: ['', [Validators.required]],
          enderecoLogradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          enderecoBairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          enderecoLatitude: [null],
          enderecoLongitude: [null],
          enderecoCep: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
          cidadeId: [null, [Validators.required]],
          enderecoId: [null],
          pacienteId: [this.pacienteId]
        });
      }


  ionViewDidLoad() {
    this.obterCidades();

  }
  obterCidades(){
    this.cidadeService.findAll()
    .then(res=>{
      this.cidades = res;
      this.cidadeEncontrada = null;
      this.verificaUpdate();
    })
  }
  adicionarLocal(){
    if(!this.localExame){
      this.salvarLocalExame()
    }else{
      this.atualizarLocalExame()
    }
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
            this.navCtrl.pop()
          }
        }
      ]
    });
    alert.present();
  }
  salvarLocalExame(){
    this.formGroup.removeControl('enderecoId')
    this.localExameService.insert(this.formGroup.value).then(res=>{
      this.showAlertSucesso('Local de Exame adicionado');
    })
  }
  atualizarLocalExame(){
    this.localExameService.update(this.formGroup.value,this.localExame.id).then(res=>{
      this.showAlertSucesso('Local de Exame atualizado');
    })
  }
  buscarViaCep() {
    this.viaCepService.findEnderecoByCep(this.formGroup.value.enderecoCep)
    .subscribe(res=>{
      this.exibirToastEnderecoEncontrado();
      this.formGroup.controls.enderecoBairro.setValue(res['bairro']);
      this.formGroup.controls.enderecoLogradouro.setValue(res['logradouro']);
     this.cidadeEncontrada = this.cidades.find(el=>el.nome === res['localidade']);
     this.buscarLatLong()
     if(this.cidadeEncontrada){
      this.formGroup.controls.cidadeId.setValue(this.cidadeEncontrada.id);
     }
    },error=>this.exibirToastCepInvalido());
  }
  buscarLatLong(){
    this.googleMapsService.findLocationByCep(this.formGroup.value.enderecoCep)
    .then(location =>{
      console.log(location.results[0].geometry.location.lat)
      console.log(location.results[0].geometry.location.lng)
      this.formGroup.controls.enderecoLatitude.setValue(location.results[0].geometry.location.lat);
      this.formGroup.controls.enderecoLongitude.setValue(location.results[0].geometry.location.lng);

    })
  }
  verificaUpdate(){
    if(this.localExame){
      this.formGroup.controls.nome.setValue(this.localExame.nome);
      this.formGroup.controls.enderecoNumero.setValue(this.localExame.enderecoNumero);
      this.formGroup.controls.enderecoLogradouro.setValue(this.localExame.enderecoLogradouro);
      this.formGroup.controls.enderecoCep.setValue(this.localExame.enderecoCep);
      this.formGroup.controls.enderecoLatitude.setValue(this.localExame.enderecoLatitude);
      this.formGroup.controls.enderecoLongitute.setValue(this.localExame.enderecoLongitute);
      this.formGroup.controls.enderecoBairro.setValue(this.localExame.enderecoBairro);
      this.formGroup.controls.cidadeId.setValue(this.localExame.cidadeId);
      this.formGroup.controls.pacienteId.setValue(this.localExame.pacienteId);
      this.formGroup.controls.enderecoId.setValue(this.localExame.enderecoId);
      this.cidadeEncontrada = this.cidades.find(el=>el.id === this.localExame.cidadeId);

      this.formGroup.controls.cidadeId.setValue(this.cidadeEncontrada.id);
     }
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
