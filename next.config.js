/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost',
      'api.nearestlaundry.com',
      'nearestlaundry.com',
      'new.nearestlaundry.com',
      'beta.nearestlaundry.com',
        'ui-avatars.com'
    ],
  }
}

module.exports = nextConfig
