import { SplashScreen } from '@ionic-native/splash-screen';
import { Component, ViewChild } from '@angular/core';
import { Nav, NavParams, Tabs, Events, Platform } from 'ionic-angular';

declare var window;

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('tabs') tabs: Tabs;
  child;
  pagina;
  static index;

  constructor(
    public navCtrl: Nav,
    public navParams: NavParams,
    private events: Events,
    private splashScreen: SplashScreen,
    private platform: Platform
    ) {
    this.events.subscribe('tabs:reset', () => this.resetTabs());
  }

  ngOnInit() {
    this.pagina = this.navParams.get('pagina');
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        if(window.cordova){
          this.splashScreen.hide();
        }
      }, 1000)
    })
  }


  ionViewWillEnter() {
    if (this.pagina) {
      this.tabs.selectedIndex = TabsPage.index;
      this.child = this.tabs.getByIndex(TabsPage.index);

      let params = this.navParams.get('params');
      if (params) {
        this.child.push(this.pagina, params);
      } else {
        this.child.push(this.pagina);
      }
      this.pagina = undefined;
    }
  }

  getIndex() {
    return TabsPage.index;
  }

  resetTabs() {
    for (let i = 0; i < this.tabs.length(); i++) {
      let tempTab = this.tabs.getByIndex(i);
      if (tempTab.getViews())
        if (tempTab.getViews().length > 0)
          tempTab.goToRoot({});
    }

  }

  onTabsChange(index) {
    TabsPage.index = index;
  }

}
