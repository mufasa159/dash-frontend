/** @type {import('next').NextConfig} */
const path = require('path')
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  env: {
    productionUrl: "",    // dont't include slash (/) after the url
    dbServerUrl: "",      // dont't include slash (/) after the url
    timeZone: "America/New_York",
    newsApiKey: "",
    calClientId: "",
    calApiKey: "",
    upstashToken: "",
    upstashUrl: "",
    spotifyClientId: "",
    spotifyClientSecret: "",
    spotifyRefreshToken: "",
  }
}
