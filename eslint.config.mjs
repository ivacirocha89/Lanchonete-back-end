import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import("eslint").Linter.Config} */
export default {
  languageOptions: {
    globals: globals.node,
  },
  ...pluginJs.configs.recommended,
  extends: [
    "standard",
    "prettier" // Adiciona suporte ao Prettier
  ],
  plugins: ["prettier"],
  rules: {
    camelcase: "off",
    "prettier/prettier": "error",
  },
};
