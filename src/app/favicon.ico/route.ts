const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#171717" />
  <path d="M18 46 28.8 17h6.5L46 46h-7l-2.1-6.4H27L24.9 46H18Zm10.8-12h6.3L32 24.5 28.8 34Z" fill="#f9f9f7" />
</svg>`;

export function GET() {
  return new Response(favicon, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml",
    },
  });
}
