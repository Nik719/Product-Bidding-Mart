import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BidsComponent } from './bids.component';

const routes: Routes = [
  { path: '', component: BidsComponent }
];

@NgModule({
  declarations: [BidsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class BidsModule { }