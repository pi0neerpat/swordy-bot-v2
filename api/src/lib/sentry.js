import * as Sentry from '@sentry/node'
/* eslint-disable-next-line no-unused-vars */
import * as Tracing from '@sentry/tracing'
import { isProduction } from 'src/lib/helpers'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.5,
  environment: isProduction ? 'production' : 'development',
})

export default Sentry
