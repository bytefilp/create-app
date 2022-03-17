module.exports = function (api) {
    api.cache(true);

    return {
        comments: true,
        presets: [
            [
                '@babel/env',
                {
                    targets: {
                        ie: '11',
                        edge: '17',
                        firefox: '60',
                        chrome: '67',
                        safari: '11.1'
                    },
                    useBuiltIns: 'usage',
                    modules: false,
                    corejs: {
                        version: 3,
                        proposals: true
                    }
                }
            ],
            '@babel/react'
        ]
    };
};
