import { RepositoryInterface } from '../../interfaces'

export default abstract class BaseUseCase {
  constructor(
    protected readonly repository: RepositoryInterface,
  ) {}
}
