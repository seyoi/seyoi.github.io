const path = require('path'); // Add this line to import the path module

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
    output: {
        filename: 'bundle.js', // Adjust the filename as needed
        path: path.resolve(__dirname, 'dist'), // Adjust the output directory path as needed
    },
      
    entry: './src/index.js', // Adjust the path and filename according to your project structure

    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // 타입스크립트 확장자 추가
      },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader', // ts-loader 사용
              },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
