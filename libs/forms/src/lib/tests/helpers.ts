import { Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '../../../../../node_modules/@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AukFormFieldModule } from '../form-field';
import { AukInputModule } from '../input/input.module';
import { BrowserAnimationsModule } from '../../../../../node_modules/@angular/platform-browser/animations';

export function createComponent<T>(component: Type<T>,
                            providers: Provider[] = [],
                            imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      AukFormFieldModule,
      AukInputModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      ...imports
    ],
    declarations: [component],
    providers
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}
