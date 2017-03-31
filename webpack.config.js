var path = require('path');

module.exports = {
    entry: {
        index: './src/index.ts',
        instance: './src/instance.ts',
        syntax: './src/syntax.ts',
        computed: './src/computed.ts',
        'class-and-style': './src/class-and-style.ts',
        conditional: './src/conditional.ts',
        list: './src/list.ts',
        events: './src/events.ts',
        forms: './src/forms.ts',
        components: './src/components.ts'
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'}
        ]
    },
    resolve: {
        alias: {
            vue: path.resolve(__dirname, './node_modules/vue/dist/vue.js')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        port: 3000,
        watchContentBase: true
    }
};