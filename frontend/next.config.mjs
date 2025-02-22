/** @type {import('next').NextConfig} */
const nextConfig = {
     async rewrites() {
       return [
         {
           source: "/:path*", // Match all routes
           destination: "http://localhost:5000/:path*", // Forward to Express backend
         },
       ];
     },
   };
   
   export default nextConfig;
   