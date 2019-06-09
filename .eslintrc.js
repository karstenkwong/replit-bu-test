module.exports = {
    env: {
        "browser": true,
        "es6": true,
        "node": true,
        "commonjs": true
    },
    extends: ['prettier', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['eslint-plugin-import', '@typescript-eslint'],
    ecmaFeatures: {
        modules: true
    },
    parserOptions: {
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        }
    },
    rules: {
        'prettier/prettier': 'error'
    }
};
