import { async, TestBed } from '@angular/core/testing';
import { AukLayoutModule } from './layout.module';

describe('LayoutModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AukLayoutModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AukLayoutModule).toBeDefined();
  });
});
