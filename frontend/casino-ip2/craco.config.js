const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CracoSwcPlugin = require("craco-swc");
const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    plugins: ["@emotion"],
  },
  webpack: {
    plugins: [new AntdDayjsWebpackPlugin()],
  },
  plugins: [
    { plugin: CracoSwcPlugin },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(191,191,191)",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};