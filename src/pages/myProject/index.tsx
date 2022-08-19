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
      <div title="点击选择" className={clsx(style.card)} key={item.url}>
        <p>{index + 1}</p>
        {infoKV.map((el, index) => (
          <>
            <p key={index}>
              {' '}
              <span>{el.label}：</span>
              {el.prop === 'url' ? (
                <a href={formatState(item, el.prop)} target="_blank">
                  点击前往
                </a>
              ) : (
                formatState(item, el.prop)
              )}
            </p>
          </>
        ))}
      </div>
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
