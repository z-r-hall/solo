const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports={
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
devServer: {
  port: "8080",
  static: ["./public"],
  open: true, 
  hot: true, 
  compress: true,
  liveReload: true
},
  mode: 'production',
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,

        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
}

// mode: "development",
// entry: "./index.js",
// output: {
//   path: path.resolve(__dirname, "build"),
//   filename: "bundle.js"
// },
// plugins: [new HtmlWebpackPlugin({
//   template: 'public/index.html',
//   filename: 'public/index.html'
// })],
// stats: {
//   children: true
// },
// target: "web",
// devServer: {
//   port: "8080",
//   static: ["./public"],
//   open: true, 
//   hot: true, 
//   compress: true,
//   liveReload: true
// },
// resolve: {
//   extensions: ['.js', '.jsx', '.json']
// }, 
// module: {
//   rules: [
//     {
//       test: /\.(js|jsx)$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env', '@babel/preset-react'],
//           plugins: ['@babel/plugin-transform-runtime']
//         }
//     }
//   },
//   {
//     test: /.(css|scss)$/,
//     exclude: /node_modules/,
//     use: ['style-loader', 'css-loader', 'sass-loader'],
//   },
//   ]
// }