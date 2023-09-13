import type { StorybookConfig } from "@storybook/nextjs";
import path from 'path'
const config: StorybookConfig = {
    stories: ["../components/*.stories.@(js|jsx|ts|tsx)", "../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../containers/*.stories.@(js|jsx|ts|tsx)", "../containers/**/*.stories.@(js|jsx|ts|tsx)",
        "../app/*.stories.@(js|jsx|ts|tsx)", "../app/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    staticDirs: ['../public'],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        '@storybook/addon-backgrounds',
        {
            name: '@storybook/addon-styling',
            options: {
                // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
                // For more details on this addon's options.
                postCss: true,
            },
        },
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpack(config: any, options) {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "../"),
        }
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            os: false
        }
        config.module.rules.unshift({
            resourceQuery: /raw/,
            type: 'asset/source',
        });
        return config
    },
};
export default config;
