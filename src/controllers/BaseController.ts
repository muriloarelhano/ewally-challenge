import { RepositoryInterface } from '../interfaces'

export default abstract class BaseController {
  constructor(
    protected readonly repository: RepositoryInterface,
    protected readonly cache: Cache,
  ) {}
}
