
import { registerDatabaseContainers } from './database-containers'
import { registerRepositoryContainers } from './repository-containers'

export const registerContainers = (): void => {
  registerDatabaseContainers()
  registerRepositoryContainers()
}
