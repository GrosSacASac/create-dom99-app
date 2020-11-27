
import { terser } from "rollup-plugin-terser";

import cjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'source/js/core/main.js',
    output: [
        {
            file: 'built/js/bundle.es.min.js',
            format: 'esm',
          },
    ],
    plugins: [
      nodeResolve({browser: true}),
      cjs(),
      terser(),
    ],
  },
]

