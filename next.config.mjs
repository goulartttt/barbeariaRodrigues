/** Fora da produção (HML e prévias), pede aos buscadores para não indexar o site. */
const isProduction = process.env.VERCEL_ENV === "production";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    if (isProduction) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;
