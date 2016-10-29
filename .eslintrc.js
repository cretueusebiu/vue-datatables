module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'vue',
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
