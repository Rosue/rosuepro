const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { blogPosts } = require('../src/data/blogPosts');

const ORIGIN = 'https://rosue.pro';
const OUT_DIR = path.join(__dirname, '../public/qr/blog');
const QR_WIDTH = 112;

function slugFromPath(postPath) {
  return postPath.replace(/^\/blog\//, '').replace(/\/$/, '');
}

async function writeBlogQr(post) {
  const slug = slugFromPath(post.path);
  const url = `${ORIGIN}${post.path}`;
  const outFile = path.join(OUT_DIR, `${slug}.svg`);
  const svg = await QRCode.toString(url, {
    type: 'svg',
    margin: 4,
    width: QR_WIDTH,
    color: { dark: '#000000', light: '#ffffff' },
  });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(outFile, svg.trim() + '\n', 'utf8');
  console.log(`Wrote ${outFile}`);
}

async function main() {
  for (const post of blogPosts) {
    await writeBlogQr(post);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
