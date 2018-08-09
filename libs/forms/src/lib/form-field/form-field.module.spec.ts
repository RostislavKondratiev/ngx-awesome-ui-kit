import { AukFormFieldModule } from './form-field.module';

describe('FormFieldModule', () => {
  let formFieldModule: AukFormFieldModule;

  beforeEach(() => {
    formFieldModule = new AukFormFieldModule();
  });

  it('should create an instance', () => {
    expect(formFieldModule).toBeTruthy();
  });
});
