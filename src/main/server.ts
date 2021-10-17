import 'reflect-metadata'
import * as containers from '../helper/containers'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { AccountResolver } from './resolver/account'
import { TodoResolver } from './resolver/to-do'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function start (): Promise<void> {
  /* registering tsyringe containers */
  containers.registerDatabaseContainers()
  containers.registerRepositoryContainers()

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AccountResolver, TodoResolver]
    })
  })

  const port = process.env.PORT || 4100
  server.listen(port).then(({ url }) => {
    console.log(`server running at ${url}`)
  }).catch(() => {
    console.log('something goes wrong')
  })
})()
