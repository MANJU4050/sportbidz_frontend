import { lazy } from 'react'

import styles from '../../assets/css/components/layout/index.module.css'
const Header = lazy(() => import('./header/index'))
const Sidebar = lazy(() => import('./sidebar/index'))
const Content = lazy(() => import('./content/index'))


const Layout = () => {

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <Content />
    </div>
  )
}

export default Layout