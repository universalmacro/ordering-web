module.exports = {
  parser:  "@typescript-eslint/parser",   
  extends: [ "plugin:react/recommended", "plugin:@typescript-eslint/recommended", ],
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  rules: {
    "import/extensions": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error", { ignoreTypeReferences: true }],
    "no-prototype-builtins": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "object-curly-newline": "off",
    "no-var": "error",
    "react/jsx-indent": ["error", 2],
    "semi": ["error", "always"],
    "eqeqeq": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "arrow-parens": ["warn", "as-needed"],
    "arrow-spacing": ["warn", { before: true, after: true }],
    "max-len": ["warn", { code: 100 }],
    "@typescript-eslint/no-empty-function": "warn",
    "arrow-parens": "off",

    // react 相關配置
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/sort-comp": "error",
    "react/self-closing-comp": ["warn", { "component": true, "html": false }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off"
    },
    settings: {
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures":{
            jsx:true
        }
    },
  }