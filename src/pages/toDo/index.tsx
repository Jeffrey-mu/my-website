import React, { useRef, useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import style from './index.module.css'
import clsx from 'clsx';
import { get } from '../../utils/request'
import Link from '@docusaurus/Link';
import dayjs from 'dayjs'

interface ToDo {
  title: string
  description: string
  date: string
  name: string
  id?: number
}
export default function App() {
  const [card, setCard] = useState<ToDo[]>([])
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [dataInfo, setDataInfo] = useState<ToDo>({
    title: '1',
    description: '',
    date: dayjs().format("YYYY-MM-DD"),
    name: '',
  })
  const infoKV = [
    {
      prop: 'title',
      label: '标题'
    }, {
      prop: 'description',
      label: '描述'
    }, {
      prop: 'date',
      label: '时间',
      type: 'text'
    }, {
      prop: 'name',
      label: '用户'
    }
  ]
  useEffect(() => {
    console.log(dataInfo)
    Fetch({ toType: 'get' })
  }, [])
  type FetchType = 'get' | 'edit' | 'delete' | 'insert' | 'update'
  interface FetchOptions<T = any> {
    toType?: FetchType,
    data?: T
  }
  function Fetch(options?: FetchOptions) {
    get('http://localhost:1323/todo', options).then(res => {
      setCard(JSON.parse(res))
    })
  }
  function ToDoAction() {
    return <>
      <div className={style.toDoAction}>
        <Link
          className="button button--secondary button--lg" onClick={
            setShowAdd.bind(null, true)
          }>
          添加事件
        </Link>
      </div>
    </>
  }

  function insert() {
    Fetch({
      toType: "insert",
      data: JSON.stringify([{ ...dataInfo, id: card.at(-1).id + 1 }])
    })
    console.log(dataInfo)
  }

  function addData() {
    return showAdd && <div className={clsx(style.card)}>
      <p>序号：{card.length + 1}</p>
      {infoKV.map(el =>
        <>
          <p>{el.label}：{el.type !== 'text' ? <input type="text" value={dataInfo[el.prop]} onChange={(e) => {
            setDataInfo({ ...dataInfo, ...{ [el.prop]: e.target.value } })
          }} /> : dataInfo[el.prop]}</p>
        </>
      )}
      <button onClick={insert}>提交</button>
      <button onClick={() => {
        setShowAdd(false)
      }}>取消</button>
    </div >
  }

  function Card() {
    return card.map((item, index) =>
      <div className={clsx(style.card)} key={index}>
        <p>序号：{index + 1}</p>
        {infoKV.map(el => <>
          <p>{el.label}：{item[el.prop]}</p>
        </>)}
      </div>
    )
  }
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <ToDoAction></ToDoAction>
        <main className={style.main}>
          {Card()}
          {addData()}
        </main>
      </Layout>
    </>
  );
}

