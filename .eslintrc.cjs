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
        'prettier',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'only-multiline',
                functions: 'never',
            },
        ],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ],
        'semi-spacing': [
            'error',
            {
                before: false,
                after: false,
            },
        ],
        'no-trailing-spaces': 'error',
        'no-duplicate-imports': 'error',
        'no-useless-computed-key': 'error',
        'rest-spread-spacing': ['error', 'never'],
        indent: ['error', 4],
        semi: ['error', 'always'],
        'react/jsx-uses-react': 'error',
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
    eqeqeq: ['error', 'smart'],
    'brace-style': [
        'error',
        '1tbs',
        {
            allowSingleLine: true,
        },
    ],
    curly: 'off',
    'object-shorthand': ['warn', 'always'],
    'key-spacing': [
        'error',
        {
            beforeColon: false,
            afterColon: true,
            mode: 'strict',
        },
    ],
    camelcase: [
        'warn',
        {
            properties: 'always',
        },
    ],
    'dot-location': ['error', 'property'],
    'generator-star-spacing': ['off'],
    'block-spacing': ['error', 'always'],
    'comma-style': ['error', 'last'],
    'comma-spacing': [
        'error',
        {
            before: false,
            after: true,
        },
    ],
    'no-extend-native': 'error',
    'no-loop-func': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-multi-str': 'error',
    'no-script-url': 'error',
    'no-shadow-restricted-names': 'error',
    'no-spaced-func': 'error',
    'no-sparse-arrays': 'warn',
    'no-fallthrough': 'warn',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-multiple-empty-lines': [
        'error',
        {
            max: 2,
            maxEOF: 1,
        },
    ],
    'no-multi-spaces': [
        'error',
        {
            ignoreEOLComments: true,
        },
    ],
    'no-negated-in-lhs': 'error',
    'no-new': 'error',
    'no-new-require': 'error',
    'block-scoped-var': 'error',
    'no-use-before-define': 'warn',
    'no-proto': 'error',
    complexity: ['warn', 50],
    'wrap-iife': ['error', 'outside'],
    'new-parens': 'error',
    'space-infix-ops': 'error',
    'eol-last': ['error', 'always'],
    'space-unary-ops': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'space-before-blocks': ['error', 'always'],
    yoda: ['error', 'never'],
    'space-before-function-paren': 'off',
    'spaced-comment': ['error', 'always'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-indent': ['error', 2],
    'react/jsx-no-duplicate-props': 'error',
    'react/no-deprecated': 'error',
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
};
