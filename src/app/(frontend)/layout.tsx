import { Montserrat, Merriweather } from 'next/font/google'
import { Tooltip } from '@base-ui-components/react/tooltip'
import React from 'react'
import { Header } from './_components/header'
import './global.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-merriweather',
})

export const metadata = {
  description: 'Blog personnel de Thibaut Izard',
  title: 'frenchdev',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="fr" className={`${montserrat.variable} ${merriweather.variable}`}>
      <body>
        <div className="root min-h-screen mx-auto p-8 max-w-[75ch] space-y-8">
          <Tooltip.Provider>
            <Header />
            <main className="space-y-8">{children}</main>
          </Tooltip.Provider>
        </div>
      </body>
    </html>
  )
}
