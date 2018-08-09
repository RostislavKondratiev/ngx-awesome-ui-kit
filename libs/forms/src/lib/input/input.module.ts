import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukInputDirective } from './input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AukInputDirective],
  exports: [AukInputDirective]
})
export class AukInputModule { }
