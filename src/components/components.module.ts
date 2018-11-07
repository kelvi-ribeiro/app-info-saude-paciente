import { NgModule } from '@angular/core';
import { ExpandableComponent } from './expandable/expandable';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [ExpandableComponent,
    HeaderComponent],
	imports: [IonicModule],
	exports: [ExpandableComponent,
    HeaderComponent]
})
export class ComponentsModule {}
