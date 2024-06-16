import { defineConfig } from "orval";

export default defineConfig({
	api: {
		input: "./openapi-schema.yml",

		output: {
			client: "fetch",
			target: "./src/api",
		},

		hooks: {
			afterAllFilesWrite: "prettier --write",
		},
	},
});
