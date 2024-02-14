import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts', // 진입 파일 경로
  output: {
    file: 'dist/bundle.js', // 번들 파일 경로
    format: 'umd', // 번들링된 파일 형식
    name: 'MyCalendarLibrary', // 번들링된 라이브러리 이름
  },
  plugins: [
    nodeResolve(), // node_modules에서 모듈을 찾아 해결
    commonjs(), // CommonJS 모듈을 ES6로 변환
    typescript(), // TypeScript 파일을 컴파일
  ],
};
