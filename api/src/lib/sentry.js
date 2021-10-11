import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.5,
})

export default Sentry
