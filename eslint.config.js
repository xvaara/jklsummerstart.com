import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
    },
  },
)
