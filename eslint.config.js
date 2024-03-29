// https://github.com/jsx-eslint/eslint-plugin-react#configuration-new-eslintconfigjs
// https://eslint.org/docs/latest/use/configure/configuration-files-new
import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import";

const reactPreset = react.configs.recommended;

export default [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
      typescriptPlugin,
      import: eslintPluginImport,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ...reactPreset.parserOptions,
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...reactPreset.rules,
    },
  },

  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: {
      ...js.configs.recommended.rules,

      "no-console": ["error"],

      // react +17 doesn't need to have react imported
      "react/react-in-jsx-scope": ["off"],
      "react/button-has-type": ["error"],
      "react/default-props-match-prop-types": ["warn"],
      "react/iframe-missing-sandbox": ["error"],
      "react/jsx-max-depth": [
        "warn",
        {
          max: 5,
        },
      ],
      "react/jsx-no-constructed-context-values": ["error"],

      // eslint-plugin-import rules
      ...eslintPluginImport.configs.recommended.rules,
      "import/no-cycle": ["error"],
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-undef": ["off"],
      "no-unused-vars": ["warn"],
    },
  },
];
