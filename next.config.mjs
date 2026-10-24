// Safe security headers (CSP jaan-bhujkar nahi: YouTube, Maps, Cloudinary, Google Fonts sab use hote hain)
const headers = [['X-Content-Type-Options', 'nosniff'], ['Referrer-Policy', 'strict-origin-when-cross-origin'], ['X-Frame-Options', 'SAMEORIGIN'], ['Permissions-Policy', 'camera=(), microphone=(), geolocation=()']];
export default {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() { return [{ source: '/:path*', headers: headers.map(([key, value]) => ({ key, value })) }]; },
};
