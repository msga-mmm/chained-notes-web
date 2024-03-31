// @ts-check

// https://github.com/jsx-eslint/eslint-plugin-react#configuration-new-eslintconfigjs
// https://eslint.org/docs/latest/use/configure/configuration-files-new
import js from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginDeprecation from "eslint-plugin-deprecation";
import eslintPluginFunctional from "eslint-plugin-functional/flat";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJSXA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPromise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTestingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

const reactPreset = react.configs.recommended;

export default typescriptEslint.config(
  ...typescriptEslint.configs.strictTypeChecked,

  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
      ts: typescriptEslintPlugin,
      import: eslintPluginImport,
      promise: eslintPluginPromise,
      deprecation: eslintPluginDeprecation,
      "react-hooks": eslintPluginReactHooks,
      functional: eslintPluginFunctional,
      "jsx-a11y": eslintPluginJSXA11y,
      "@typescript-eslint": typescriptEslint.plugin,
      "testing-library": eslintPluginTestingLibrary,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ...reactPreset.parserOptions,
        project: true,
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
      complexity: ["error", 10],
      eqeqeq: "error",

      // https://stackoverflow.com/a/61555310
      "ts/no-unused-vars": ["error"],
      "no-unused-vars": ["off"],

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
      "import/order": [
        "error",
        {
          groups: [
            "index",
            "sibling",
            "parent",
            "internal",
            "external",
            "builtin",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // eslint-plugin-promise rules
      ...eslintPluginPromise.configs.recommended.rules,

      // eslint-plugin-deprecation rules
      ...eslintPluginDeprecation.configs.recommended.rules,

      // eslint-plugin-react-hooks rules
      ...eslintPluginReactHooks.configs.recommended.rules,

      // eslint-plugin-functional rules
      ...eslintPluginFunctional.configs.recommended.rules,
      "functional/functional-parameters": [
        "error",
        {
          enforceParameterCount: false,
        },
      ],
      "functional/no-mixed-types": "off",
      "functional/no-return-void": "off",
      "functional/no-expression-statements": ["error", { ignoreVoid: true }],

      // eslint-plugin-jsx-a11y rules
      ...eslintPluginJSXA11y.configs.recommended.rules,

      // typescript-eslint rules
      "@typescript-eslint/no-floating-promises": "error",
      // TODO: avoid disabling eslint rule
      "@typescript-eslint/no-unsafe-assignment": "off",
      // TODO: avoid disabling eslint rule
      "@typescript-eslint/no-unsafe-member-access": "off",

      // eslint-config-prettier rules
      ...eslintConfigPrettier.rules,
    },
  },

  {
    files: ["**/*.test.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: {
      ...eslintPluginTestingLibrary.configs.react.rules,
    },
  },

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-undef": ["off"],
    },
  },
);
