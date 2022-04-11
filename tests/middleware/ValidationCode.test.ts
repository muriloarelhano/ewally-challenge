import { join } from 'path';
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import { ValidationCode } from '../../src/middleware';
import { TicketPayload } from '../../src/domain/entities';

describe('Testing Validation Code Middleware', () => {
  let mockPayload: TicketPayload;
  beforeEach((done) => {
    mockPayload = {
      lineCode: 'ksdjhkdsfhjkdsf123445ghsdf7686675756',
    };

    i18next.use(backend).init(
      {
        backend: {
          loadPath: join(
            __dirname,
            '..',
            '..',
            'src',
            '/locales/{{lng}}/{{ns}}.json',
          ),
        },
        lng: 'pt',
        fallbackLng: 'pt',
        load: 'languageOnly',
      },
      (err, t) => {
        i18next.changeLanguage('pt');
        if (err) {
          console.log(err.stack);
        }
        done();
      },
    );
  });

  const validationMiddleware = new ValidationCode();

  it('Should return an error when pass some string in line code', () => {
    expect(() => {
      validationMiddleware.validate(mockPayload);
    }).toThrowError(i18next.t('error.string_not_allowed'));
  });

  it('Should return an error when pass some code with wrong format', () => {
    mockPayload = {
      lineCode: '237846582973648562938476598726348576298374659287346523452345',
    };
    expect(() => {
      validationMiddleware.validate(mockPayload);
    }).toThrowError(i18next.t('error.line_invalid_format'));
  });

  it('Should return an error when pass some code with wrong format', () => {
    mockPayload = {
      lineCode: '00190500914014481606906809350314337370000000100',
    };
    expect(() => {
      validationMiddleware.validate(mockPayload);
    }).toThrowError(i18next.t('error.check_digit'));
  });
});
