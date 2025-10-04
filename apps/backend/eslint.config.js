import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  // Biomeと重複する規則を無効化
  rules: {
    // フォーマット関連はBiomeに任せる
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'prettier/prettier': 'off',
  },
})
