import { async, TestBed } from '@angular/core/testing';
import { AukTableModule } from './table.module';

describe('TableModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [AukTableModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AukTableModule).toBeDefined();
  });
});
