import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { NextUIProvider } from '@nextui-org/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot, hydrateRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    if (import.meta.env.SSR) {
      hydrateRoot(
        el,
        <NextUIProvider>
          <App {...props} />
        </NextUIProvider>,
      )
      return
    }

    createRoot(el).render(
      <NextUIProvider>
        <App {...props} />
      </NextUIProvider>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})
