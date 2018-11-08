import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaLocalizacaoExamesPage } from './mapa-localizacao-exames';
import { MapsProvider } from '../../services/google-maps/maps';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsService } from '../../services/google-maps/google.maps.service';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MapaLocalizacaoExamesPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaLocalizacaoExamesPage),
    ComponentsModule
  ],
  providers:[
    Geolocation,
    MapsProvider,
    GoogleMapsService
  ]
})
export class MapaLocalizacaoExamesPageModule {}
