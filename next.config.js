/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_audio/",
          outputPath: "static/_audio/",
          name: "[name].[ext]",
          esModule: false,
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
