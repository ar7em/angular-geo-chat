var path = require("path");
var ForkCheckerPlugin = require("awesome-typescript-loader").ForkCheckerPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",

  entry: {
    "main": "./src/main.ts"
  },

  resolve: {
    extensions: ["", ".ts", ".js", ".json", ".html"],
    root: path.join(__dirname, "src"),
    alias: {
      templates: path.join(__dirname, "src", "templates"),
      components: path.join(__dirname, "src", "components"),
      modules: path.join(__dirname, "src", "modules"),
      config: path.join(__dirname, "src", "config"),
      services: path.join(__dirname, "src", "services"),
      models: path.join(__dirname, "src", "models")
    },
    modulesDirectories: ["node_modules"]
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    sourceMapFilename: "[name].map"
  },

  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: "src"
  },

  devServer: {
    port: 1337,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: path.join(__dirname, "dist")
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          "awesome-typescript-loader",
          "angular2-template-loader"
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /components[\\\/].+\.(html)$/,
        loader: "raw-loader"
      },
      {
        test: /templates[\\\/].+\.(html)$/,
        loaders: [
          "html?interpolate"
        ]
      },
      {
        test: /\.css$/, loader: "raw-loader!style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loaders: ["to-string", "style", "css", "sass"]
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ],
    sassLoader: {
      includePaths: [path.join(__dirname, "node_modules")]
    }
  },

  plugins: [
    new ForkCheckerPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "templates", "index.html")
    })
  ]
};
