module.exports = {
  root: true,
  extends: ["@repo/eslint-config/library"],
  settings: {
    next: {
      rootDir: ["apps/*/"]
    }
  }
}
