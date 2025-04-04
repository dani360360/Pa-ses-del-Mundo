
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'flagcdn.com',        
      'upload.wikimedia.org' 
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,  
  }

};

export default nextConfig;