import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import toolsStyle from '../tools/index.module.css'
import style from './index.module.css'
import clsx from 'clsx'
import {
  getLearnData,
  getLearnDataType,
  LearnDataTypeModel,
  LearnDataModel,
} from '../../api/learning_resource'

export default function App() {
  const [learnData, setLearnData] = useState<LearnDataModel[]>([])
  const [learnDataType, setLearnDataType] = useState<LearnDataTypeModel[]>([])
  const [active, setActive] = useState<number>(1)
  useEffect(() => {
    getDataType()
  }, [])
  async function getDataType() {
    let data = await getLearnDataType()
    setLearnDataType(data)
    getData()
  }
  async function getData() {
    let data = await getLearnData()
    setLearnData(data)
  }
  function handleMenu(id: number) {
    setActive(id)
  }
  function Menu() {
    return learnDataType.map((item, index) => (
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
    return learnData.map((item) => (
      <>
        <section className={style.card}>
          <div className={style.cardContent}>
            <div className={style.cardImage}>
              <img src={item.img} alt="" />
            </div>
            <div className={style.cardR}>
              <div>{item.title}</div>
              <p>{item.description}</p>
            </div>
          </div>
          <div className={style.cardLink}>
            <a href="#">喜欢</a>
            <a href="#">分享</a>
            <a href={item.url}>访问</a>
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
          <div className={toolsStyle.leftMmenu}>{Menu()}</div>
          <div className={style.rightContent}>{Card()}</div>
        </main>
      </Layout>
    </>
  )
}
