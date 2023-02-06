// eslint-disable-next-line no-undef
module.exports = {
    env: {
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2022
    },
    plugins: ['prettier'],
    extends: ['plugin:prettier/recommended'],
    rules: {
        'no-var': 'error'
    }
};