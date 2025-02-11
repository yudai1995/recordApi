const path = require('path');
const { ESLint } = require('eslint');

module.exports = [
    {
        files: ['src/**/*.ts', 'test/**/*.ts'],
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                project: path.resolve(__dirname, 'tsconfig.json'),
                tsconfigRootDir: __dirname,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            import: require('eslint-plugin-import'),
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            indent: ['error', 4],
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                },
            ],
        },
    },
];
