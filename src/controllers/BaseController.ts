import { Logger } from 'winston';

export default abstract class BaseController {
  constructor(
    protected readonly logger: Logger,
    protected readonly cache: any,
  ) {}
}
