import i18next from 'i18next';
import middleware from 'i18next-http-middleware';
import backend from 'i18next-fs-backend';
import { join } from 'path';

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    preload: ['en', 'pt'],
    backend: {
      loadPath: join(__dirname, '..', '/locales/{{lng}}/{{ns}}.json'),
    },
    fallbackLng: 'pt',
    load: 'languageOnly',
  });

export const i18nHandler = middleware.handle(i18next);
