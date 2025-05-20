// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 👇 Disable bridgeless mode in dev
config.server = {
  ...config.server,
  experimental: {
    ...config.server?.experimental,
    enableHermesBridge: true,
  },
};

module.exports = config;
