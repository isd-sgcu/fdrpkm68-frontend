import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import astroParser from "astro-eslint-parser";
import astroPlugin from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

export default [
  {
    ignores: [
      "dist/**/*",
      ".astro/**/*",
      "node_modules/**/*",
      "*.min.js",
      "*.min.css",
      "build/**/*",
      "coverage/**/*",
      "public/**/*",
    ],
  },

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        browser: true,
        node: true,
        es2022: true,
      },
    },
  },

  // Base configuration for all TypeScript and React files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      ...tsPlugin.configs.strict.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      // "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "error",
      // "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "error",

      // Import Rules
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "react/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@astrojs/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "astro/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@common/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@firstdate/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@rpkm/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "./**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-relative-packages": "error",
      // "import/no-relative-parent-imports": "error",
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../*', './*']
        }
      ],
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],

      // React Rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-bind": "warn",
      "react/jsx-boolean-value": ["error", "never"],
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": ["error", "never"],

      // Accessibility Rules
      ...jsxA11yPlugin.configs.recommended.rules,

      // Security Rules
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",

      // Code Quality Rules
      "prefer-const": "error",
      "no-var": "error",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },

  // Astro files configuration
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    plugins: {
      astro: astroPlugin,
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "unused-imports": unusedImportsPlugin,
      import: importPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-undef": "off",

      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "error",

      // Import rules
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",

      curly: ["warn", "multi-line"],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // JavaScript and Module files
  {
    files: ["**/*.js", "**/*.mjs"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Import ordering for JS files
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Basic code quality
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],

      // Security
      "no-eval": "error",
      "no-implied-eval": "error",
    },
  },

  // Test files
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off",
    },
  },

  // API routes
  {
    files: ["src/pages/api/**/*.ts", "src/pages/api/**/*.js"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },

  // Configuration files
  {
    files: [
      "*.config.{js,ts,mjs}",
      "tailwind.config.js",
      "astro.config.mjs",
      "eslint.config.mjs",
    ],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "off",
      "import/no-default-export": "off",
    },
  },
];
