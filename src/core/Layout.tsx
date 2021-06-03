import React, { useEffect, useState } from "react"
import Helmet from "react-helmet"
import { IntlProvider } from "react-intl"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import { ThemeProvider } from "styled-components"

import { GlobalStyles } from "./GlobalStyles"

import { DEFAULT_LANG } from "../utils/const"
import en from "../config/locale/en-US.ts"
import ru from "../config/locale/ru-RU.ts"
import zh from "../config/locale/zh-CN.ts"

const phrases = {
  'en': en,
  'ru': ru,
  'zh': zh,
}

import locale from "../config/locale"
import theme from "../config/styled/theme"

import Header from "../containers/Header"
import Footer from "../containers/Footer"

interface Props {
  title?: string
  description?: string
  isSecondaryHeader?: boolean
  children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ title, description, isSecondaryHeader = false, children }: Props) => {
  const [language, setLanguage] = useState('en')
  const messages = language === 'en' ? phrases['en'] : { ...phrases['en'], ...phrases[language] }
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            name
            title
            description
          }
        }
      }
    `,
  )
  const { title: defaultTitle, description: defaultDescription } = site.siteMetadata

  useEffect(() => {
    setLanguage(navigator.language.split(/[-_]/)[0])
  }, [])

  return (
    <IntlProvider locale={language} messages={messages}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{title ?? defaultTitle}</title>

        <meta name="theme-color" content="#00665e" />
        <meta name="description" content={description ?? defaultDescription} />
        <meta property='og:description' content={description ?? defaultDescription} />
        <meta property="og:image" content={withPrefix("/images/website-preview.png")} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property='og:title' content={title ?? defaultTitle} />
        <meta property='og:url' content="//proofof.dog" />

        <link rel="manifest" href={withPrefix("/favicon/site.webmanifest")} />

        {/* <meta name="twitter:card" content="photo" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:title" content={site.title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:url" content="" /> */}

        <link rel="apple-touch-icon" href={withPrefix("/favicon/apple-touch-icon.png")} />
        <link rel="icon" href={withPrefix("/favicon/favicon.ico")} />
        <link rel="icon" type="image/png" sizes="16x16" href={withPrefix("/favicon/favicon-16x16.png")} />
        <link rel="icon" type="image/png" sizes="32x32" href={withPrefix("/favicon/favicon-32x32.png")} />
        <link rel="icon" type="image/png" sizes="192x192" href={withPrefix("/favicon/android-chrome-192x192.png")} />
        <link rel="icon" type="image/png" sizes="512x512" href={withPrefix("/favicon/android-chrome-512x512.png")} />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>

      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header secondary={isSecondaryHeader} />
        {children}
        <Footer />
      </ThemeProvider>
    </IntlProvider>
  )
}

export default Layout
