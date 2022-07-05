import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { LoadingController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  markerId: string;
  center: any = {
    lat: -22.9028152,
    lng: -47.1868944,
  };

  loading: any;

  constructor(
    private loadingCtrl: LoadingController
  ) {
    //this.showLoading().then();
  }

  ngAfterViewInit() {
    this.createMap();
    //this.addMarker(-22.9027136, -47.1781424);
  }

  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'google-maps-capacitor',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: this.center,
          zoom: 10,
        },
      });

     

    
    
      this.addMarker(this.center.lat, this.center.lng); //marcar no mapa
      this.addMarker(-22.9067669, -47.055478)
      await this.newMap.enableAccessibilityElements(true);
      
      //this.addListeners();
    } catch (e) {
      console.log(e);
    }
  }

  async addMarker(lat, lng) {
   //if (this.markerId) this.removerMarker();

    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng, 
      },
      //draggable: true,
    });
  }

  async removerMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    

    await this.newMap.setOnMarkerClickListener((e) => {
      console.log('setOnMarkerClickListener', e);
      //this.removerMarker(e.markerId);
    });

    await this.newMap.setOnMapClickListener((e) => {
      console.log('setOnMapClickListener', e);
      this.addMarker(e.latitude, e.longitude);
    });

    await this.newMap.setOnMyLocationButtonClickListener((e) => {
      console.log('setOnMyLocationButtonClickListener', e);
      //this.addMarker(e.latitude, e.longitude);
    });

    await this.newMap.setOnMyLocationClickListener((e) => {
      console.log('setOnMyLocationClickListener', e);
      this.addMarker(e.latitude, e.longitude);
    });
  }

  async showLoading() {
    this.loading = this.loadingCtrl.create({message: 'Aguarde...'});
    await this.loading.present();
  }
}
