import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
// import 'antd/dist/antd.css'
// import 'antd/dist/antd.dark.css'
import styles from './index.module.css'
function buttonItem(options) {
  return (
    <>
      <div className={styles.button} key={options.url}>
        <Link className="button button--secondary button--lg" to={options.url}>
          {options.label}
        </Link>
      </div>
    </>
  )
}
const routes = [
  { label: '待办事项', url: 'todo' },
  { label: '我的项目', url: 'myProject' },
  { label: 'tracking', url: 'tracking' },
]
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {routes.map((item, index) => buttonItem(item))}
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>{/* <HomepageFeatures /> */}</main>
    </Layout>
  )
}
