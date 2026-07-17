/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@repo/types",
    "@repo/utils",
    "@repo/api-client",
    "@repo/crud",
    "@repo/auth-core",
    "@repo/auth-custom-api",
    "@repo/admin-ui",
    "@repo/web-ui",
    "@repo/ui"
  ]
}

module.exports = nextConfig
