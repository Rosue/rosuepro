const fs = require('fs');
const path = require('path');

const INDEX = path.join(__dirname, '../build/index.html');
const QR_PUBLIC = path.join(__dirname, '../build/home-share-qr.svg');

function fail(message) {
  console.error(`verify-home-share-prerender: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(INDEX)) {
  fail('build/index.html not found — run npm run build first');
}

const html = fs.readFileSync(INDEX, 'utf8');

if (html.includes('[object Object]')) {
  fail('prerendered HTML still contains [object Object] (broken asset reference)');
}

const qrBlockMatch = html.match(
  /<div class="home-share-qr"[^>]*>[\s\S]*?<img([^>]+)>/i
);
if (!qrBlockMatch) {
  fail('home share QR block not found in build/index.html');
}

const imgAttrs = qrBlockMatch[1];
const srcMatch = imgAttrs.match(/\ssrc="([^"]+)"/i);
if (!srcMatch) {
  fail('home share QR <img> is missing a src attribute');
}

const src = srcMatch[1];
if (src === '[object Object]' || src.includes('object Object')) {
  fail(`home share QR src is invalid: ${src}`);
}

if (!src.endsWith('/home-share-qr.svg') && src !== '/home-share-qr.svg') {
  fail(`home share QR src must point at /home-share-qr.svg, got: ${src}`);
}

if (!fs.existsSync(QR_PUBLIC)) {
  fail('build/home-share-qr.svg is missing from the production build output');
}

const svg = fs.readFileSync(QR_PUBLIC, 'utf8');
if (!svg.includes('<svg') || !svg.includes('</svg>')) {
  fail('build/home-share-qr.svg does not look like SVG markup');
}

console.log('verify-home-share-prerender: OK');
