/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:react-perf/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:unicorn/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "@tanstack/query",
    "simple-import-sort",
    "unused-imports",
    "no-relative-import-paths",
    "unicorn",
    "no-only-tests",
  ],
  rules: {
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        callees: ["classnames", "clsx", "ctl", "cva", "tv", "twMerge"],
        whitelist: ["mousetrap", "animate__.+"],
      },
    ],
    camelcase: [
      "error",
      {
        allow: [
          "app_id",
          "app_secret",
          "refresh_token",
          "grant_type",
          "collection_name",
          "query_string",
        ],
        // We have snake_case props in our database models due to the initial migration from Python
        properties: "never",
      },
    ],
    "sort-imports": "off", // disable built-in sort-imports (in case some other preset enables it)
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-named-as-default-member": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unicorn/prefer-at": "error",
    "unicorn/prefer-string-replace-all": "off",
    "unicorn/switch-case-braces": "off", // eslint already has a rule for that
    "unicorn/prefer-number-properties": "off",
    "unicorn/prefer-event-target": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/no-static-only-class": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-nested-ternary": "off",
    "unicorn/prefer-ternary": "off",
    "unicorn/no-typeof-undefined": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-empty-file": "off",
    "unicorn/no-abusive-eslint-disable": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-type-error": "off",
    "unicorn/explicit-length-check": "off",
    "import/namespace": "off",
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: DEFAULT_FILE_CASING_IGNORE,
      },
    ],
    "unicorn/no-negated-condition": "off",
    "unicorn/no-await-expression-member": "off",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { prefix: "@", allowSameFolder: true },
    ],
    "@typescript-eslint/no-explicit-any": "off", // TODO(jonathan): turn this on at some point
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { fixStyle: "inline-type-imports" },
    ],
    "import/no-default-export": "error",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "error",
    "react-perf/jsx-no-new-object-as-prop": [
      "error",
      { nativeAllowList: ["style", "dangerouslySetInnerHTML"] },
    ],
    "no-console": "error",
    "no-only-tests/no-only-tests": [
      "error",
      {
        block: ["test", "it", "assert", "describe", "benchmark"],
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts"],
      rules: {
        "react-hooks/rules-of-hooks": "off",
      },
    },
    {
      files: ["**/*.test.ts", "**/*.test.tsx"],
      rules: {
        "unicorn/template-indent": "off",
      },
    },
    {
      files: ["agent/lmpAgent/apis/cli/**/*", "scripts/**/*"],
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["src/**/*"],
      rules: {
        // TODO(jonathan): enable this until we have some proper logging in the frontend
        "no-console": ["off", { allow: ["warn", "error"] }],
      },
    },
    {
      files: ["src/pages/**/*"],
      rules: {
        "import/no-default-export": "off",
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              kebabCase: true,
              camelCase: false,
              pascalCase: false,
            },
            ignore: DEFAULT_FILE_CASING_IGNORE,
          },
        ],
      },
    },
    {
      files: ["database/orm/**/*"],
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              kebabCase: false,
              camelCase: true,
              pascalCase: false,
            },
            ignore: DEFAULT_FILE_CASING_IGNORE,
          },
        ],
      },
    },
    {
      files: ["database/models/**/*", "database/types/**/*"],
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              kebabCase: false,
              camelCase: false,
              pascalCase: true,
            },
            ignore: [],
          },
        ],
      },
    },
    {
      files: ["migrations/*", "migrate-mongo-config.js"],
      rules: {
        "unicorn/filename-case": ["off"],
        "import/no-default-export": ["off"],
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
