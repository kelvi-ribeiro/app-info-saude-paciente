import { Component, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MapsProvider } from "../../services/google-maps/maps";
import { Geolocation } from '@ionic-native/geolocation';

import { LatLng } from "@ionic-native/google-maps";
import { ExameService } from "../../services/domain/exame.service";
import { StorageService } from "../../services/storage.service";


@IonicPage()
@Component({
  selector: 'page-mapa-localizacao-exames',
  templateUrl: 'mapa-localizacao-exames.html',
})
export class MapaLocalizacaoExamesPage {
  exame;
  location: {
    latitude: number;
    longitude: number;
  };
  markerOptions ;

  @ViewChild("map") mapElement: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams:NavParams,
    public geolocation: Geolocation,
    public mapsProvider: MapsProvider,
    public exameService:ExameService,
    public storageService:StorageService    
   ) {
    this.exame = this.navParams.get('exame')    
    this.criaObjetoMarksBaseadoExame()
  }



  findUserLocation() {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };
    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.mapsProvider.init(this.location, this.mapElement,this.markerOptions);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  criaObjetoMarksBaseadoExame(){
      let latLng;
      latLng  = new LatLng(this.exame.localExameLatitude, this.exame.localExameLongitude);
      this.markerOptions =  {
        title:`${this.exame.nome}`,
        position:latLng,
        icon: 'red',
        animation: 'DROP',
      }
      this.findUserLocation();
    }
}
