// https://github.com/jsx-eslint/eslint-plugin-react#configuration-new-eslintconfigjs
import react from "eslint-plugin-react";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";

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
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: {
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
    },
  },
];
