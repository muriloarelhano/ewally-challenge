import { RepositoryInterface } from '../../interfaces'

export default abstract class BaseService {
  constructor(
    protected readonly repository: RepositoryInterface,
  ) {}
}
