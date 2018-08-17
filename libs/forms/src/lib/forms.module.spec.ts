import { async, TestBed } from '@angular/core/testing';
import { AukFormsModule } from './forms.module';

describe('FormsModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AukFormsModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
