import fs from 'node:fs/promises'
import express from 'express'
import { createServer } from 'vite'

const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Create http server
const app = express()

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  base
})

app.use(vite.middlewares)

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')
    // Always read fresh template in development
    const render = (await vite.ssrLoadModule('src/server.tsx')).render
    let template = await fs.readFile('./index.html', 'utf-8')
    template = await vite.transformIndexHtml(url, template)

    const rendered = await render(req, res)
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${rendered}</div>`
    )

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
