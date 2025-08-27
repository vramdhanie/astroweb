import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'books.google.com',
                port: '',
                pathname: '/books/**',
            },
            {
                protocol: 'http',
                hostname: 'books.google.com',
                port: '',
                pathname: '/books/**',
            },
        ],
    },
}

export default nextConfig
