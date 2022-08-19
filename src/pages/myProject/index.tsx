import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import style from './index.module.css'
import clsx from 'clsx'
import {
  getMyProjectData,
  MyProjectModel,
  addMyProjectData,
} from '../../api/myProject'
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
  const [card, setCard] = useState<MyProjectModel[]>([])
  interface DataInfoKV {
    prop: string
    label: string
  }
  const infoKV: DataInfoKV[] = [
    {
      prop: 'name',
      label: '站名',
    },
    {
      prop: 'description',
      label: '描述',
    },
    {
      prop: 'url',
      label: '地址',
    },
  ]
  useEffect(() => {
    getData()
  }, [])

  async function getData(options?: FetchOptions) {
    let { result } = await getMyProjectData()
    setCard(result)
  }
  function Card() {
    return card.map((item, index) => (
      <>
        <section className={style.card}>
          <div className={style.cardContent}>
            <div className={style.cardImage}>
              <img src={item.img} alt="" />
            </div>
            <div className={style.cardR}>
              <div>{item.name}</div>
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
            <a href={item.githubLink} target="_blank">
              github
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
        <main className={style.main}>{Card()}</main>
      </Layout>
    </>
  )
}
