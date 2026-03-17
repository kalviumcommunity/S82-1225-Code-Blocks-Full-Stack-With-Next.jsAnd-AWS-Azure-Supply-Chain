/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // 🔐 Enforce HTTPS (only meaningful in production)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // 🔐 Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js HMR needs 'unsafe-eval' in dev; removed in production
              isDev
                ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
                : "script-src 'self' 'unsafe-inline'",
              // Allow Google Fonts stylesheets
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Allow Google Fonts font files
              "font-src 'self' https://fonts.gstatic.com",
              // Images
              "img-src 'self' data: blob:",
              // API calls
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },

          // 🔐 Extra hardening headers
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
