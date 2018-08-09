import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukErrorDirective } from './error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AukErrorDirective
  ],
  exports: [
    AukErrorDirective
  ]
})
export class AukErrorsModule { }
