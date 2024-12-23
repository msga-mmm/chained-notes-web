/// <reference types="vitest" />

import presetAttributify from "@unocss/preset-attributify";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    tsconfigPaths(),
    UnoCSS({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      theme: {
        colors: {
          main: {
            red: "rgb(235, 36, 0) !important",
          },
        },
      },
      shortcuts: {
        "btn-main":
          "bg-main-red b-none rounded-4px color-white font-bold text-16px cursor-pointer p-.4rem",
      },
    }),
    React(),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      all: true,
    },
    isolate: false,
    sequence: {
      concurrent: true,
    },
  },
});
