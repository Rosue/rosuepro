/**
 * Inline above-the-fold CSS with Critters and load the remaining bundle asynchronously.
 */
const fs = require('fs');
const path = require('path');
const Critters = require('critters');

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('defer-render-blocking-css: build/index.html not found');
  process.exit(1);
}

(async () => {
  const critters = new Critters({
    path: buildDir,
    publicPath: '/',
    preload: 'swap',
    pruneSource: false,
    logLevel: 'warn',
  });
  const html = fs.readFileSync(indexPath, 'utf8');
  const output = await critters.process(html);
  fs.writeFileSync(indexPath, output);
  console.log('Applied Critters critical CSS to build/index.html');
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
