
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    transpilePackages: ["[a-z].*", "@mdx.*"],
    // ["next-mdx-.+", "@mdx.+", "remark-.+", "micromark-.+", "decode-.+", "character-.*", "mdast-.*", "ccount",
    //     "escape.*", "u.*", "markdown.*", "b.*", "i.*", "t.*", "v.*",  "e.*", "p.*"],
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        })
        return config
    },
    experimental: {
        appDir: true,
    }
}
module.exports = nextConfig
