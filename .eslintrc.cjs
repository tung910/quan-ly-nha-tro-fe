/* eslint-disable no-undef */
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/jsx-uses-react': 'error',
        camelcase: 2,
        'no-console': 'error',
        eqeqeq: [2, 'always'],
        curly: 'error',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [
            1,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'react/prop-types': 0,
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        'react/jsx-uses-vars': 'error',
        'react/boolean-prop-naming': ['error', { validateNested: true }],
    },
};
