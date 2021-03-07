const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                },
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/*.html', to: '[name].[ext]'}
            ]
        })
    ]
}