module.exports = {
  //프로젝트의 루트에서 찾아지는 최상위 설정 파일
  root: true,
  //브라우저 전역 변수를 인식, ES2020 글로벌들과 구문들을 사용 가능하게 함
  env: { browser: true, es2020: true },
  extends: [
    //TypeScript에 권장되는 기본 규칙들
    "plugin:@typescript-eslint/recommended",
    //TypeScript에 권장되는 기본 규칙들
    'plugin:@typescript-eslint/recommended',
    //React Hooks의 권장 규칙들
    'plugin:react-hooks/recommended',
    "plugin:prettier/recommended",
  ],
  //ESLint 검사에서 제외할 패턴 (빌드 된 결과물 디렉토리, 해당 ESLint 설정 파일 자체)
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  //TypeScript 코드를 파싱하기 위해 사용되는 파서
  parser: '@typescript-eslint/parser',
  //프로젝트에서 사용하는 추가 ESLint 플러그인들
  plugins: [
    '@typescript-eslint',
    'react-refresh',
    'prettier'],
    //React 컴포넌트를 export 할 때의 규칙
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}