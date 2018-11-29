import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { MedicamentoService } from '../../services/domain/medicamento.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';


@IonicPage()
@Component({
  selector: 'page-historico-medicamento',
  templateUrl: 'historico-medicamento.html',
})
export class HistoricoMedicamentoPage {
  medicamentos;
  carregou:boolean = false
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public service:MedicamentoService,
              public alertCtrl:AlertController,
              public notificacoesService:NotificacoesService,
              public actionSheetCtrl:ActionSheetController) {
  }

  ionViewDidLoad() {
    this.obterMedicamentosInativos()
  }
  obterMedicamentosInativos(){
    this.service.findMedicamentosInativosByPacienteId()
    .then(res=>{
      this.medicamentos = res;
      this.carregou = true;
    })
  }

  alertApagar(medicamento) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá apagar o medicamento, tem certeza disso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagar(medicamento)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  alertRestaurarMedicamento(medicamento) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá restaurar o medicamento, deseja mesmo fazer isso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.setAtivo(medicamento)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  apagar(medicamento){
    this.service.delete(medicamento.id)
    .then(() =>{
      this.refreshPage()
    })

  }
  
  refreshPage(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);    
  }
  setAtivo(medicamento){
    this.service.setAtivo(medicamento.id)
    .then(()=>{      
      this.refreshPage()
      this.obterMedicamentosInativos();
    })
  } 
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({          
      buttons: [
        {
          text: 'Página Principal',             
          icon:'home',           
          handler: () => {
            this.navCtrl.setRoot('HomePage')
          }
        },
        {
          text: 'Excluir todos os medicamentos',
          icon:'trash',           
          handler: () => {
            this.alertApagarTodosMedicamentos()
            setTimeout(() => {
              this.refreshPage()
            }, 600);
          }
        },
        {
          text: 'Restaurar todos os Medicamentos',
          icon:'refresh-circle',           
          handler: () => {
            this.alertRestaurarTodosMedicamentos()
            setTimeout(() => {
              this.refreshPage()
            }, 600);
          
          }
        },         
                      
        {
          text: 'Cancelar',            
          icon:'close',  
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  } 
  apagarTodosMedicamentos(){    
     this.medicamentos.forEach(element => {
      this.service.delete(element.id)
    }); 
  }
  restaurarTodosMedicamentos(){   
    return this.medicamentos.forEach(element => {
      this.service.setAtivo(element.id)
    }); 
  }
  alertApagarTodosMedicamentos() {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: 'Deseja mesmo apagar todos os medicamentos ?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {            
          this.apagarTodosMedicamentos()
          
          setTimeout(() => {
          this.refreshPage()
            }, 1000);          
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  alertRestaurarTodosMedicamentos() {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: 'Deseja mesmo restaurar todos os medicamentos ?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {            
          this.restaurarTodosMedicamentos()
          setTimeout(() => {
            this.refreshPage()
          }, 1000);
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
}
