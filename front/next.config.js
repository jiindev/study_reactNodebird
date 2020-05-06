const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: 'true',
  });
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
    distDir: '.next',
    webpack(config) {
        console.log('config', config);
        console.log('rules', config.module.rules[0]);
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [
            ...config.plugins,
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ];
        if(prod){
            plugins.push(new CompressionPlugin())
        }
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {
                        loader: 'webpack-ant-icon-loader',
                        enforce: 'pre',
                        include: [
                            require.resolve('@ant-design/icons/lib/dist'),
                        ]
                    }
                ]
            },
            plugins,
        };
    }
});