import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ['github.com', 'avatars.githubusercontent.com'],
    },
    async rewrites() {
        return [
            {
                source: '/blogs/:slug.md',
                destination: '/api/blog/:slug',
            },
        ]
    },
};

export default nextConfig;
