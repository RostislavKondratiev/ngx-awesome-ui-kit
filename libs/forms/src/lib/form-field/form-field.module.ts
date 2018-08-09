import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AukFormFieldComponent } from './form-field.component';
import { AukErrorsModule } from '../errors';
import { AukErrorStrategy } from './error-strategy/error-strategy';

@NgModule({
  imports: [
    CommonModule,
    AukErrorsModule,
  ],
  declarations: [AukFormFieldComponent],
  providers: [AukErrorStrategy],
  exports: [
    AukErrorsModule,
    AukFormFieldComponent,
  ]
})
export class AukFormFieldModule {
}
