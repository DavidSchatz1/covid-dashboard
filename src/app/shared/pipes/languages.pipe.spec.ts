import { LanguagesPipe } from './languages.pipe';
import { TranslationService } from '../../core/services/translation.service';

describe('LanguagesPipe', () => {
  it('should create an instance', () => {
    const mockTranslationService = {
      getTranslation$: () => ({
        subscribe: () => ({})
      })
    } as unknown as TranslationService;

    const pipe = new LanguagesPipe(mockTranslationService);
    expect(pipe).toBeTruthy();
  });
});

