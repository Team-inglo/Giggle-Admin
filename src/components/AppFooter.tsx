import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://www.giggle-inglo.com" target="_blank" rel="noopener noreferrer">
          Giggle
        </a>
        <span className="ms-1">&copy; 2025 inglo.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
