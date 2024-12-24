import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/navbar'
import './index.css'

const Layout = ({ children, data, location }) => {
  // Check if we're on the assignment page
  const isAssignmentPage = location && location.pathname === '/assignment/'
  
  return (
    <div>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { name: 'keywords', content: data.site.siteMetadata.keywords },
        ]}
      />
      {!isAssignmentPage && <Header />}
      {children()}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        keywords
        description
      }
    }
  }
`
