// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  // Your custom configs here
  rules: {
    'vue/multi-word-component-names': ['off'],
    '@stylistic/semi': ['error', 'always'],
  },
},
);
