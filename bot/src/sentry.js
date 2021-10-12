const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.5,
})

module.exports = Sentry
