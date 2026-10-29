// Builds the site into dist/ for deploying: the pages, with css/style.css minified and inlined
// into each one (saves a render-blocking request on mobile), plus fonts/, img/ (without img/src/), js/
// and the root files. The source files are not changed, so keep editing css/style.css as usual.
//   npm run build        (the host runs this on every push; publish directory: dist)
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { minify } from 'csso'

const root = new URL('..', import.meta.url).pathname
const dist = join(root, 'dist')
const link = '<link rel="stylesheet" href="css/style.css">'

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist)

for (const dir of ['fonts', 'img', 'js']) {
	cpSync(join(root, dir), join(dist, dir), {
		recursive: true,
		filter: (src) => !src.endsWith('.DS_Store') && !src.startsWith(join(root, 'img', 'src')),
	})
}
for (const file of ['robots.txt', 'sitemap.xml', 'site.webmanifest', 'favicon.ico', 'favicon.svg']) {
	if (existsSync(join(root, file))) cpSync(join(root, file), join(dist, file))
}

// Font urls are relative to css/; inlined, they are relative to the page
const css = minify(readFileSync(join(root, 'css', 'style.css'), 'utf8')).css.replaceAll('url(../', 'url(')

for (const page of readdirSync(root).filter((f) => f.endsWith('.html'))) {
	const html = readFileSync(join(root, page), 'utf8')
	if (!html.includes(link)) throw new Error(`${page}: stylesheet link not found: ${link}`)
	writeFileSync(join(dist, page), html.replace(link, () => `<style>${css}</style>`))
	console.log(`dist/${page}  CSS inlined (${(css.length / 1024).toFixed(1)} KB)`)
}
