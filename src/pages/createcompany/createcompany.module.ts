import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatecompanyPage } from './createcompany';

@NgModule({
  declarations: [
    CreatecompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatecompanyPage),
  ],
})
export class CreatecompanyPageModule {}
