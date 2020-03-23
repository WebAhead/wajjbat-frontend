module.exports = {
  root: true,
  extends: ['airbnb'],
  plugins: ['import', 'react', 'jsx-a11y'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    },
    sourceType: 'module',
    ecmaVersion: 2017
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    semi: 'off',
    'class-methods-use-this': 'off',
    quotes: ['error', 'single'],
    'global-require': 'off',
    'implicit-arrow-linebreak': 'warn',
    indent: [
      'warn',
      4,
      {
        SwitchCase: 1
      }
    ],
    'key-spacing': 'off',
    'lines-between-class-members': 'warn',
    'max-len': 'off',
    'newline-per-chained-call': 'off',
    'no-alert': 'off',
    'no-bitwise': 'off',
    'no-confusing-arrow': 'off',
    'no-else-return': 'warn',
    'array-callback-return': 'off',
    'no-multi-spaces': [
      'warn',
      {
        ignoreEOLComments: true,
        exceptions: {
          AssignmentExpression: true,
          VariableDeclarator: true
        }
      }
    ],
    'no-multiple-empty-lines': 'warn',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-globals': 'off',
    'no-template-curly-in-string': 'off',
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '[Ss]tyles'
      }
    ],
    'object-curly-newline': [
      'warn',
      {
        multiline: true,
        consistent: true
      }
    ],
    'object-shorthand': 'off',
    'operator-linebreak': 'warn',
    'padded-blocks': [
      'warn',
      {
        classes: 'always'
      }
    ],
    'prefer-arrow-callback': 'off',
    'prefer-destructuring': 'off',
    'prefer-rest-params': 'off',
    'quote-props': ['warn', 'consistent'],
    radix: 'off',
    'sort-imports': 'off',
    'template-curly-spacing': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/no-children-prop': 'off',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': ['warn', 4],
    'react/jsx-indent-props': ['warn', 4],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-tag-spacing': [
      'warn',
      {
        afterOpening: 'never',
        beforeClosing: 'never',
        beforeSelfClosing: 'always',
        closingSlash: 'never'
      }
    ],
    'react/jsx-wrap-multilines': 'warn',
    'react/no-access-state-in-setstate': 'warn',
    'react/no-array-index-key': 'off',
    'react/no-find-dom-node': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/no-unused-state': 'off',
    'react/prop-types': [
      'warn',
      {
        skipUndeclared: true
      }
    ],
    'react/sort-comp': 'warn'
  }
};
