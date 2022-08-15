const puppeteer = require('puppeteer')
const path = require('path')

async function generatePDF(fname, outname) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto(`file:${path.join(__dirname, fname)}`)
  await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 })

  await page.pdf({
    format: 'A4',
    path: path.join(__dirname, outname),
    printBackground: true,
  })

  await browser.close()
}

console.log('Generating...')

generatePDF('index.html', 'output.pdf')
  .then(() => {
    console.log('PDF exported!')
  })
  .catch((err) => {
    console.log('Error')
    console.log(err)
  })
