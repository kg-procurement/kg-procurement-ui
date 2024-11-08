import fs from 'node:fs/promises'

import express from 'express'
import { createServer as createViteServer, type ViteDevServer } from 'vite'

import { RenderReturn } from '@/entry-server.tsx'
// import { accountApi } from '@/lib/redux/features/account/api.ts'
import { configureAppStore } from '@/lib/redux/store.ts'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.SERVER_PORT ?? 5173

const productionTemplateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
// const ssrManifest = isProduction
//   ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
//   : undefined

const app = express()

let vite: ViteDevServer
if (!isProduction) {
  vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  })
  app.use(vite.middlewares)
}
else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use('/', sirv('./dist/client', { extensions: [] }))
}

app.use('*', async (req, res) => {
  const url = req.originalUrl.replace('/', '')

  console.log(' >>', req.cookies)

  let template: string
  let render: RenderReturn
  try {
    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('./src/entry-server.tsx')).render
    }
    else {
      template = productionTemplateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }

    const store = configureAppStore()
    // await store.dispatch(accountApi.endpoints.getCurrentUser.initiate())

    const { appHtml, serializedStoreData } = await render(store)
    let html = template.replace(`<!--ssr-outlet-->`, appHtml)
    html = html.replace(
      `<!--store-data-outlet-->`,
      `<script id="__STORE_DATA__" type="application/json">${serializedStoreData}</script>`,
    )

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  }
  catch (e) {
    if (e instanceof Error) {
      vite.ssrFixStacktrace(e)
      res.status(500).end(e.stack)
    }
    else {
      console.error('Something went wrong when handling request: ', e)
    }
  }
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
