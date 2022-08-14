import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import style from './index.module.css'
import clsx from 'clsx'
import { getToolsData, ToolsDataModel } from '../../api/tools'
const stateName = ['未开始', '已收到', '进行中', '已完成']
function formatState(item, prop) {
  if (prop === 'state') {
    return stateName[item[prop]]
  }
  return item[prop]
}

type FetchType = 'get' | 'edit' | 'delete' | 'insert' | 'update'
interface FetchOptions<T = any> {
  toType?: FetchType
  data?: T
}
export default function App() {
  const [tools, setTools] = useState<ToolsDataModel[]>([])
  const [active, setActive] = useState<string>('')
  interface DataInfoKV {
    prop: string
    label: string
  }
  const infoKV: DataInfoKV[] = [
    {
      prop: 'title',
      label: '',
    },
  ]
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    let data = await getToolsData()
    setTools(data)
    setActive(data[0].url)
  }
  function handleMenu(url: string) {
    setActive(url)
  }
  function Tools() {
    return tools.map((item, index) => (
      <div
        title={item.description}
        onClick={() => handleMenu(item.url)}
        className={clsx(style.tools, active === item.url && style.active)}
        key={item.url}
      >
        {infoKV.map((el, index) => (
          <>
            <p key={index}>{item[el.prop]}</p>
          </>
        ))}
      </div>
    ))
  }
  function Iframe() {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <iframe className={style.frame} src={active}></iframe>
          <div
            style={{
              padding: '10px',
              flex: 1,
              textAlign: 'center',
            }}
          >
            滑<br />
            动 <br />
            区 <br />域
          </div>
        </div>
      </>
    )
  }
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        <main className={style.main}>
          <div className={style.leftMmenu}>{Tools()}</div>
          <Iframe />
        </main>
      </Layout>
    </>
  )
}
