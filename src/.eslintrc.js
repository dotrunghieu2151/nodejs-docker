module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    "import",
    "@typescript-eslint/eslint-plugin",
    "prettier",
    "jest",
  ],
  extends: [
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "import/order": [
      "error",
      {
        "pathGroups": [
          {
            "pattern": "@/**",
            "group": "external",
            "position": "after"
          }
        ],
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    // "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": true }],
  },
  settings: {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "src/tsconfig.json",
      }
    }
  }
};
