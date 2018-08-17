import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukErrorDirective } from './error.directive';
import { AukServerErrorDirective } from './server-error.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AukErrorDirective,
    AukServerErrorDirective,
  ],
  exports: [
    AukErrorDirective,
    AukServerErrorDirective
  ]
})
export class AukErrorsModule { }
