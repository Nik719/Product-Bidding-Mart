import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { WalletComponent } from './wallet.component';

const routes: Routes = [
  { path: '', component: WalletComponent }
];

@NgModule({
  declarations: [WalletComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class WalletModule { }