import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
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
    turbopack: {
        root: process.cwd(),
    },
}

export default nextConfig
