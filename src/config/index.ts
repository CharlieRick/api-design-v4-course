import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV

const baseConfig = {
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
}

let envConfig = {}

switch (env) {
  case 'development':
  case 'dev':
    envConfig = import('./local').then((module) => module);
    break;
  case 'prod':
  case 'production':
    envConfig = import('./prod').then((module) => module);
    break;
  default:
    envConfig = import('./local').then((module) => module);
}

// Using Promise.all to wait for all dynamic imports to resolve
Promise.all([envConfig]).then(([resolvedEnvConfig]) => {
  const mergedConfig = merge(baseConfig, resolvedEnvConfig);
  // Do something with the merged configuration
  console.log(mergedConfig);
});

export default merge(baseConfig, envConfig)
