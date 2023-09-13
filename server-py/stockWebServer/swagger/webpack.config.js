module.exports = {
    entry: './src/enc.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        
        library: {
            name: 'enc',
            type: 'var',
            export: 'default',
        },
        filename: 'enc_dist.js',
    },
};
