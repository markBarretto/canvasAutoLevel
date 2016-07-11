const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: './src/scripts.js',
    output: {
        path: __dirname + "/src",
        filename: 'scripts.min.js',
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
    plugins: [
        new BowerWebpackPlugin({
            modulesDirectories: ["bower_components"],
            manifestFiles:      "bower.json",
            includes:           /.*/
            excludes:           [],
            searchResolveModulesDirectories: true
        })
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
