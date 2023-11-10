import million from 'million/compiler';

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains:[]
    }
};

export default million.next(config, { auto: { rsc: true }, mute: true });
