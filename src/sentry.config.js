const { withSentryConfig } = require("sentry/nextjs")

const moduleExports ={

}
const SentryWenPackPluginOptions = {
    silent: true,
};
module.exports = withSentryConfig(moduleExports, SentryWenPackPluginOptions)