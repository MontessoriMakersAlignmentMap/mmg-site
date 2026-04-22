import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const covers = [
  { html: 'cover-adult-culture.html',         out: 'adult-culture-framework.png' },
  { html: 'cover-annual-cycle.html',           out: 'annual-cycle-planning-toolkit.png' },
  { html: 'cover-board-onboarding.html',       out: 'board-onboarding-alignment-toolkit.png' },
  { html: 'cover-compensation-framework.html', out: 'compensation-framework-toolkit.png' },
  { html: 'cover-conflict-feedback.html',      out: 'conflict-feedback-protocol.png' },
  { html: 'cover-enrollment-systems.html',     out: 'enrollment-systems-toolkit.png' },
  { html: 'cover-family-handbook.html',        out: 'family-handbook.png' },
  { html: 'cover-financial-literacy.html',     out: 'financial-literacy-toolkit.png' },
  { html: 'cover-hiring-selection.html',       out: 'hiring-selection-toolkit.png' },
  { html: 'cover-leadership-operations.html',  out: 'montessori-leadership-operations-playbook.png' },
  { html: 'cover-leadership-transition.html',  out: 'leadership-transition-succession-toolkit.png' },
  { html: 'cover-new-leader-onboarding.html',  out: 'new-leader-onboarding-toolkit.png' },
  { html: 'cover-performance-concerns.html',   out: 'performance-concerns-separation-toolkit.png' },
  { html: 'cover-staff-handbook.html',         out: 'staff-handbook.png' },
  { html: 'cover-staff-retention.html',        out: 'staff-retention-toolkit.png' },
]

const SRC = '/Users/hannahrichardson/Desktop/MMG/ToolBox/Documents/cover-html'
const DEST = path.join(__dirname, '../public/images/toolbox')

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewportSize({ width: 600, height: 800 })

for (const { html, out } of covers) {
  const src = `file://${SRC}/${html}`
  const dest = path.join(DEST, out)
  console.log(`Rendering ${html} → ${out}`)
  await page.goto(src, { waitUntil: 'networkidle' })
  await page.screenshot({ path: dest, clip: { x: 0, y: 0, width: 600, height: 800 }, fullPage: false })
  console.log(`  ✓ saved`)
}

await browser.close()
console.log('\nAll covers rendered.')
