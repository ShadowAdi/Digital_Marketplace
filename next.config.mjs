/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"utfs.io",
                port:"",
                protocol:"https"
            }
        ]
    }
};

export default nextConfig;
