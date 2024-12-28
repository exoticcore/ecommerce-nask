const path = require('path');

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'scss')],
    },
    images: {
        domains: ['images.unsplash.com', 'nask-media.s3.ap-southeast-1.amazonaws.com', 'localhost']
    }
    // images: {
    //     remotePatterns: [
    //         {
    //             protocol: 'https',
    //             hostname: 'images.unsplash.com',
    //             port: '',
    //             pathname: '/**'
    //         },
    //         {
    //             protocol: 'https',
    //             hostname: 'nask-media.s3.ap-southeast-1.amazonaws.com',
    //             port: '',
    //             pathname: '/**'
    //         }
    //     ]
    // },
    // output: 'standalone'
    // experimental: {
    //     outputStandalone: true,
    // }
};

module.exports = withNextIntl(nextConfig);
