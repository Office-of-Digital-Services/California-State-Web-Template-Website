import { terser } from "rollup-plugin-terser";

export default [
 {
  input: 'src/js/index.js',
  output: [
   {
    file: '_site/js/cagov.core.js',
    format: 'esm'
   },
   {
    file: '_site/js/cagov.core.min.js',
    format: 'esm',
    plugins: [terser()]
   }
  ],
  onwarn: function (warning) {
   // should intercept warnings but doesn't in some rollup versions
   if (warning.code === 'THIS_IS_UNDEFINED') { return; }

   // console.warn everything else
   console.warn(warning.message);
  }
 }
];

