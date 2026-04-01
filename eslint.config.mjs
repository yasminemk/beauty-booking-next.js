import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "test-suite/test-results/**",
      "test-suite/test-report/**",
      "playwright-report/**",
    ],
  },
];

export default config;
