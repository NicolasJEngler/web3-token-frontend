module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    // secret: process.env.SECRET
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL,
  },
}
