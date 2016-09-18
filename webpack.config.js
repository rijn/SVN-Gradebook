const webpack = require('webpack');

module.exports =
{
    entry : './src/app.js',
    output :
    {
        path : './bin',
        filename : 'remote.js'
    },
    module :
    {
        loaders : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader : 'babel-loader'
            }
        ]
    },
    plugins : [
        new webpack.optimize.UglifyJsPlugin(
        {
            compress :
            {
                warnings : false,
            },
            output :
            {
                comments : false,
            },
        }
        ),
    ]
};
