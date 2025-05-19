import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UploadCsvPageRoutingModule } from './upload-csv-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadCsvPageRoutingModule
  ]
})
export class UploadCsvPageModule {}