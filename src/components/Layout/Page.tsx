import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import Container from './Container'
import Footer from '../Menu/Footer'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
`

export const PageMeta: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const pageMeta = getCustomMeta(pathname, t) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string
}

const Page: React.FC<PageProps> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>
        {children}
        <Footer />
      </StyledPage>
    </>
  )
}

export default Page
