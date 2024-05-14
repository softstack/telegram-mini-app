const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.tsx', // Make sure this points to your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // This can be named anything; bundle.js is typical
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Ensure you have an HTML template in your public folder
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            },
            // You can add more loaders here for other types of files like CSS, SASS, etc.
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
