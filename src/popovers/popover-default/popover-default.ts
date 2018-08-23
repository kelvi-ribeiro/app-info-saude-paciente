
import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'popover-default.html',
})
export class PopoverDefaultPage {
  navCtrl;
  page; // Page Genérica a ser usada
  item: any; // Item genérico a ser usado
  nomePage;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.page = this.navParams.get('page');
    this.item = this.navParams.get('item');
    this.nomePage = this.page.constructor.name
    console.log(this.nomePage)
  }

  close() {
    this.viewCtrl.dismiss();
  }

  editar() {
    this.close()
    this.page.navCtrl.push(`Form${this.nomePage}`, { item: this.item })
  }
  deletar() {
    this.close()
    this.page.alertApagar(this.item)
  }

  ativarMedicamento() {
    this.close()
    this.page.setAtivo(this.item)
  }
  deletarMedicamento() {
    this.close()
    this.page.alertApagar(this.item)
  }
}
