// rollup.config.js

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs' // CommonJS 형식으로 번들링
  },
  plugins: [
    nodeResolve(), // 외부 종속성 해결
    commonjs(), // CommonJS 모듈을 ES6 형태로 변환
    typescript() // TypeScript 파일 컴파일
  ]
};
