const fs = require('fs');
const path = require('path');
const { blogPosts } = require('../src/data/blogPosts');

const SAMPLE_SLUG = 'ai-automation-jamaica';
const SAMPLE_HTML = path.join(__dirname, `../build/blog/${SAMPLE_SLUG}.html`);
const SAMPLE_QR = path.join(__dirname, `../build/qr/blog/${SAMPLE_SLUG}.svg`);

function fail(message) {
  console.error(`verify-blog-share-prerender: ${message}`);
  process.exit(1);
}

function slugFromPath(postPath) {
  return postPath.replace(/^\/blog\//, '').replace(/\/$/, '');
}

if (!fs.existsSync(SAMPLE_HTML)) {
  fail(`build/blog/${SAMPLE_SLUG}.html not found — run npm run build first`);
}

const html = fs.readFileSync(SAMPLE_HTML, 'utf8');

if (html.includes('[object Object]')) {
  fail('prerendered blog HTML still contains [object Object] (broken asset reference)');
}

const qrBlockMatch = html.match(
  /<div class="blog-article-share-qr"[^>]*>[\s\S]*?<img([^>]+)>/i
);
if (!qrBlockMatch) {
  fail('blog article share QR block not found in prerendered HTML');
}

const imgAttrs = qrBlockMatch[1];
const srcMatch = imgAttrs.match(/\ssrc="([^"]+)"/i);
if (!srcMatch) {
  fail('blog share QR <img> is missing a src attribute');
}

const src = srcMatch[1];
if (src === '[object Object]' || src.includes('object Object')) {
  fail(`blog share QR src is invalid: ${src}`);
}

const expectedSrc = `/qr/blog/${SAMPLE_SLUG}.svg`;
if (src !== expectedSrc && !src.endsWith(expectedSrc)) {
  fail(`blog share QR src must point at ${expectedSrc}, got: ${src}`);
}

if (!fs.existsSync(SAMPLE_QR)) {
  fail(`build/qr/blog/${SAMPLE_SLUG}.svg is missing from the production build output`);
}

const svg = fs.readFileSync(SAMPLE_QR, 'utf8');
if (!svg.includes('<svg') || !svg.includes('</svg>')) {
  fail(`build/qr/blog/${SAMPLE_SLUG}.svg does not look like SVG markup`);
}

for (const post of blogPosts) {
  const slug = slugFromPath(post.path);
  const qrPath = path.join(__dirname, `../build/qr/blog/${slug}.svg`);
  if (!fs.existsSync(qrPath)) {
    fail(`missing build output for blog QR: qr/blog/${slug}.svg`);
  }
}

console.log('verify-blog-share-prerender: OK');
