const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

const URL = 'https://rosue.pro';
const OUT = path.join(__dirname, '../src/assets/home-share-qr.svg');

async function main() {
  const innerSize = 128;
  const svg = await QRCode.toString(URL, {
    type: 'svg',
    margin: 4,
    width: innerSize,
    color: { dark: '#000000', light: '#ffffff' },
  });
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, svg.trim() + '\n', 'utf8');
  console.log(`Wrote ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
