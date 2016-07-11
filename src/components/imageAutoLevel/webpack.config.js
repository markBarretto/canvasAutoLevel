const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: __dirname + "/src",
        filename: 'main.min.js',
    },
    module: { 
        loaders: [ 
            { 
                loader: 'babel-loader', 
                test: __dirname + 'src', 
                query: { presets: 'es2015', } 
            } 
        ] 
    },
    resolve: {
        modulesDirectories: ["web_modules", "node_modules", "bower_components"]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )
    ]
    /*
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
    */
}
