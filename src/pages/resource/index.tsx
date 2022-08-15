import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import toolsStyle from '../tools/index.module.css'
import style from './index.module.css'
import clsx from 'clsx'
import {
  getResourceData,
  getResourceType,
  ResourceDataModel,
  ResourceTypeModel,
} from '../../api/resource'

export default function App() {
  const [resourceData, setResourceData] = useState<ResourceDataModel[]>([])
  const [resourceDataType, setResourceDataType] = useState<ResourceTypeModel[]>(
    []
  )
  const [active, setActive] = useState<number>(1)
  useEffect(() => {
    getDataType()
  }, [])
  async function getDataType() {
    let data = await getResourceType()
    setResourceDataType(data)
    getData()
  }
  async function getData() {
    let { result } = await getResourceData()
    setResourceData(result)
  }
  function handleMenu(id: number) {
    setActive(id)
  }
  function Menu() {
    return resourceDataType.map((item, index) => (
      <div
        onClick={() => handleMenu(item.id)}
        className={clsx(
          toolsStyle.tools,
          active === item.id && toolsStyle.active
        )}
        key={item.id}
      >
        <>
          <p key={index}>{item.label}</p>
        </>
      </div>
    ))
  }
  function Card() {
    return resourceData.map((item) => (
      <>
        <section className={style.card}>
          <div className={style.cardContent}>
            <div className={style.cardImage}>
              <img src={item.img} alt="" />
            </div>
            <div className={style.cardR}>
              <div>{item.title}</div>
              {item.description.length > 50 ? (
                <div title={item.description}>
                  {item.description.slice(0, 50)}..
                </div>
              ) : (
                <div>{item.description}</div>
              )}
            </div>
          </div>
          <div className={style.cardLink}>
            <a href="#" target="_blank">
              喜欢
            </a>
            <a href="#" target="_blank">
              分享
            </a>
            <a href={item.url} target="_blank">
              访问
            </a>
          </div>
        </section>
      </>
    ))
  }
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        <main className={clsx(toolsStyle.main, style.main)}>
          {/* <div className={toolsStyle.leftMmenu}>{Menu()}</div> */}
          <div className={style.rightContent}>{Card()}</div>
        </main>
      </Layout>
    </>
  )
}
