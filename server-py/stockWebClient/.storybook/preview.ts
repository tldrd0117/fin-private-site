import type { Preview } from "@storybook/react";
import '../styles/tailwind.css';
import '../styles/globals.css'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        backgrounds: {
            default: 'gradient',
            values: [
                {
                    name: 'gradient',
                    value: 'linear-gradient(to right, #0c1445, #4c408e)',
                },
                {
                    name: 'white',
                    value: '#fff',
                },
            ],
        },
    }

};

export default preview;
