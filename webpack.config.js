module.exports = {
    entry: './main.js',
    output: {
        path: './',
        filename: 'index.js'
    },
    devServer:{
        inline: true,
        port:3333
    },
    module:{
        loaders:[
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
        ]
    }
};