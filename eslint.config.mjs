import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['dist', 'coverage', 'example/build', '**/*.min.js']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      eslintReact.configs['recommended-typescript'],
      reactHooks.configs.flat['recommended-latest'],
      jsxA11y.configs.recommended
    ],
    languageOptions: {
      globals: { ...globals.browser }
    },
    rules: {
      // forwardRef is still required for the supported React range (>=16.8).
      '@eslint-react/no-forward-ref': 'off'
    }
  },
  {
    files: ['*.config.{ts,mjs}', 'example/*.config.ts', 'scripts/**'],
    languageOptions: { globals: { ...globals.node } }
  },
  prettier
);
