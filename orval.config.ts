import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./openapi-schema.yml",

    output: {
      // enabled to split the generated code in react-query hooks, schemas and msw code
      mode: "split",
      client: "react-query",
      target: "./src/api",

      // enabled to generate msw mocks with default configuration provided by Orval
      mock: true,

      override: {
        // Custom axios instance documentation: https://orval.dev/guides/custom-axios
        mutator: {
          path: "./src/orval/custom-axios-instance.ts",
          name: "customInstance",
        },
        // header override used to append the eslint disable comment to the
        // generated files since the files have conflict with the current eslint
        // setup
        header: ({ title, description, version }) => [
          `Generated by orval 🍺`,
          `Do not edit manually.`,
          ...(title ? [title] : []),
          ...(description ? [description] : []),
          ...(version ? [`OpenAPI spec version: ${version}`] : []),
          // TODO: avoid disabling eslint in all generated orval code
          //
          // Disabled eslint in generated orval code since the current eslint
          // rules active conflict with it
          //
          // Config based on https://github.com/orval-labs/orval/issues/346
          "eslint-disable",
        ],
      },
    },

    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
