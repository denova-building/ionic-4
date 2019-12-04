import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateTraitePage } from './create-traite.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { MaterialModule } from '../../material.module';
import {NgxMaskModule} from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: CreateTraitePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
	IonicSelectableModule,
	MaterialModule,
	NgxMaskModule.forRoot()
  ],
  declarations: [CreateTraitePage]
})
export class CreateTraitePageModule {}
