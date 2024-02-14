import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: 'index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm'
        }
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript()
    ]
};
