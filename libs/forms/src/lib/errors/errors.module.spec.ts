import { AukErrorsModule } from './errors.module';

describe('ErrorsModule', () => {
  let errorsModule: AukErrorsModule;

  beforeEach(() => {
    errorsModule = new AukErrorsModule();
  });

  it('should create an instance', () => {
    expect(errorsModule).toBeTruthy();
  });
});
