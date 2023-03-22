/** @type {import('next').NextConfig} */

const path = require('path')
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prepenData: `@import "./base.scss";`
    }
}

module.exports = nextConfig
