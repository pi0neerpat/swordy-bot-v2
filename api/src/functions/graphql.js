import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import { useSentry } from '@envelop/sentry'
/* eslint-disable-next-line no-unused-vars */
import Sentry from 'src/lib/sentry'

import { getCurrentUser } from 'src/lib/auth'
import { logger } from 'src/lib/logger'
import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'
import { db } from 'src/lib/db'

const extraPlugins = [
  useSentry({
    includeRawResult: false, // set to `true` in order to include the execution result in the metadata collected
    includeResolverArgs: false, // set to `true` in order to include the args passed to resolvers
    includeExecuteVariables: false, // set to `true` in order to include the operation variables values
    // appendTags: (args) => { return { ... }} // if you wish to add custom "tags" to the Sentry transaction created per operation
  }),
]

export const handler = createGraphQLHandler({
  getCurrentUser,
  loggerConfig: {
    logger,
    options: { tracing: true, operationName: true },
  },
  directives,
  sdls,
  services,

  extraPlugins,

  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
