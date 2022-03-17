module.exports = {
    plugins: [
        require('postcss-preset-env')({
            browsers: ['last 2 version', '>1%']
        })
    ]
};
