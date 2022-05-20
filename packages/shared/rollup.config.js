import typescript from 'rollup-plugin-typescript2';
import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';
import pkg from './package.json';

const input = "src/index.ts";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [
  typescript({ typescript: require("typescript") }),
  json(),
  image()
];

export default [
  {
    input,
    output: { file: pkg.module, format: "esm", sourcemap: true },
    plugins,
    external
  },
  {
    input,
    output: { file: pkg.main, format: "cjs", sourcemap: true },
    plugins,
    external
  },
];