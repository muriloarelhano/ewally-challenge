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

  describe('Testings initial general validation errors', () => {
    it('Should return an error when pass some string in line code', () => {
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).toThrowError(i18next.t('error.string_not_allowed'));
    });

    it('Should return an error when pass some code with wrong format', () => {
      mockPayload = {
        lineCode:
          '237846582973648562938476598726348576298374659287346523452345',
      };
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).toThrowError(i18next.t('error.line_invalid_format'));
    });
  });

  describe('Testing error on validation tickets with modules', () => {
    it('Should return an error when pass some code with wrong DV, using module10 for bank ticket', () => {
      mockPayload = {
        lineCode: '00190500914014481606906809350314337370000000100',
      };
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).toThrowError(i18next.t('error.check_digit'));
    });

    it('Should return error with incorrect fist number, for agreement ticket', () => {
      mockPayload = {
        lineCode: '258900004609524601791605607593050865831483000010',
      };
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).toThrowError(i18next.t('error.invalid_agreement_first_number'));
    });

    it('Should return error invalid DV, using module10 for agreement ticket', () => {
      mockPayload = {
        lineCode: '856900004609524601791605607593050865831483000010',
      };
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).toThrowError(i18next.t('error.check_digit'));
    });

    it('Should return error with wrong DV, using module11 for agreement ticket', () => {
      mockPayload = {
        lineCode: '858500004609524601791605607593050865831483000010',
      };
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).toThrowError(i18next.t('error.check_digit'));
    });
  });

  describe('Testing correct inputs use case', () => {
    it('Should not return any error with bank code type', () => {
      mockPayload = {
        lineCode: '21290001192110001210904475617405975870000002000',
      };
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).not.toThrowError();
    });

    it('Should not return any error with agreement code type', () => {
      mockPayload = {
        lineCode: '858900004609524601791605607593050865831483000010',
      };
      expect(() => {
        validationMiddleware.validate(mockPayload);
      }).not.toThrowError();
    });
  });
});
