
import { registerDatabaseContainers } from './database-containers'
import { registerInfraContainers } from './repository-containers'
import { registerValidationContainer } from './validators-container'

export const registerContainers = (): void => {
  registerInfraContainers()
  registerDatabaseContainers()
  registerValidationContainer()
}
