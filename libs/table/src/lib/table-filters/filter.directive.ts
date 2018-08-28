import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aukFilter]'
})
export class AukFilterDirective {

  @Input('aukFilter') public key;

  constructor(public template: TemplateRef<any>) {
  }

}
