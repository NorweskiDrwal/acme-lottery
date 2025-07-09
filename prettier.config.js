export default {
  // Code style
  semi: true,
  tabWidth: 2,
  printWidth: 90,
  endOfLine: "lf",
  singleQuote: true,
  trailingComma: "all",
  // Import sort
  importOrder: [
    "^react$",
    "^[A-z]",
    "^@[^/]",
    "^@/",
    "^\\../",
    "^\\./",
    "^.+.s?css$",
    "^\\u0000.+",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};
