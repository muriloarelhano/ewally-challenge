export default interface RepositoryInterface {
  getWelcomeMessage(name: string): Promise<string>
}
