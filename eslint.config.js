// https://github.com/jsx-eslint/eslint-plugin-react#configuration-new-eslintconfigjs
import react from "eslint-plugin-react";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";

// presets: [all, recommended, jsx-runtime]
const reactPreset = react.configs.recommended;

export default [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
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
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: {
      indent: ["error", "tab"],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
];
