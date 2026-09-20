const fs = require('fs');
const path = require('path');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const routes = Object.keys(require('../src/seo-pages.json'));
class BuildResources extends ResourceLoader {
  fetch(url) {
    const file = path.join('build', decodeURIComponent(new URL(url).pathname));
    return fs.existsSync(file) ? Promise.resolve(fs.readFileSync(file)) : null;
  }
}
(async () => {
  const errors = [];
  for (const route of routes) {
    const file = route === '/' ? 'build/index.html' : path.join('build', route + '.html');
    const log = new VirtualConsole();
    log.on('error', (...args) => errors.push({route,error:args.join(' ')}));
    log.on('jsdomError', error => errors.push({route,error:error.message}));
    const dom = new JSDOM(fs.readFileSync(file,'utf8'), {
      url: 'https://rosue.pro' + route, runScripts:'dangerously', resources:new BuildResources(), pretendToBeVisual:true, virtualConsole:log,
      beforeParse(window) {
        // An older build must still hydrate when the visitor's calendar year differs.
        const BrowserDate = window.Date;
        const future = new BrowserDate().getFullYear() + 10;
        const timestamp = BrowserDate.UTC(future, 0, 1, 12);
        window.Date = class extends BrowserDate {
          constructor(...args) {
            if (args.length) super(...args);
            else super(timestamp);
          }
          static now() { return timestamp; }
        };
        window.matchMedia = () => ({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
      }
    });
    await new Promise(resolve => dom.window.addEventListener('load',resolve));
    await new Promise(resolve => setTimeout(resolve,100));
    const doc = dom.window.document;
    if (doc.querySelectorAll('h1').length !== 1 || doc.querySelectorAll('main').length !== 1) errors.push({route,error:'Missing or duplicate landmarks after hydration'});
    if (doc.querySelector('link[rel="canonical"]').href !== 'https://rosue.pro' + route) errors.push({route,error:'Incorrect canonical after hydration'});
    if (route === '/') {
      doc.querySelector('a[href="/portfolio"]').dispatchEvent(new dom.window.MouseEvent('click',{bubbles:true,button:0}));
      await new Promise(resolve => setTimeout(resolve,100));
      if (!doc.title.includes('Portfolio') || !doc.querySelector('h1').textContent.includes('Portfolio')) errors.push({route,error:'Client navigation failed'});
    }
    dom.window.close();
  }
  if (errors.length) { console.error(JSON.stringify(errors,null,2)); process.exitCode=1; }
  else console.log('Production bundle hydrated all six routes with a future browser year and navigated successfully in JSDOM. This does not verify visual layout.');
})().catch(error => {console.error(error);process.exit(1);});
