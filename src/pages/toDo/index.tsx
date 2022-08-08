import React, { useRef, useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import style from './index.module.css'
import clsx from 'clsx';
import { get } from '../../utils/request'
import Link from '@docusaurus/Link';
import dayjs from 'dayjs'
// enum ToDoState {
//   not,
//   receive,
//   underway,
//   finish,
// }
const stateName = ['未开始', '已收到', '进行中', '已完成']
function formatState(item, prop) {
  if (prop === 'state') {
    return stateName[item[prop]]
  }
  return item[prop]
}
const toExceedTheTimeLimitTime = 1000 * 60 * 60
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
    date: dayjs().format("YYYY-MM-DD hh:mm:ss"),
    name: '',
  })
  function toExceedTheTimeLimit(time: string) {
    let nowTime = +new Date
    let targetTime = + new Date(time)
    return nowTime >= targetTime
  }
  const infoKV = [
    {
      prop: 'title',
      label: '标题',
      type: 'text',
    }, {
      prop: 'description',
      label: '描述',
      type: 'text',
    }, {
      prop: 'date',
      label: '时间',
      type: 'datetime-local'
    }, {
      prop: 'name',
      label: '用户',
      type: 'text',
    }, {
      prop: 'state',
      label: '进度',
      type: 'select',
    }
  ]
  useEffect(() => {
    Fetch({ toType: 'get' })
  }, [])
  type FetchType = 'get' | 'edit' | 'delete' | 'insert' | 'update'
  interface FetchOptions<T = any> {
    toType?: FetchType,
    data?: T
  }
  function Fetch(options?: FetchOptions) {
    get('http://localhost:1323/todo', options).then(res => {
      console.log(res)
      const data = JSON.parse(res) as ToDo[]
      console.log(data)
      data.sort((a, b) => +new Date(b.date) - +new Date(a.date))
      console.log(data)
      setCard(data)
      setShowAdd(false)
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
        <Link
          className="button button--secondary button--lg" onClick={
            setShowAdd.bind(null, true)
          }>
          修改事件
        </Link>
      </div>
    </>
  }

  function insert() {
    dataInfo.date = dayjs(dataInfo.date).format('YYYY-MM-DD HH:mm:ss');
    Fetch({
      toType: "insert",
      data: JSON.stringify([{ ...dataInfo, id: card.at(-1).id + 1 }])
    })
  }

  function addData() {
    return showAdd && <div className={clsx(style.card)}>
      <p>{card.length + 1}</p>
      {infoKV.map((el, index) =>
        <>
          <p key={index}> <span>{el.label}：</span> {<input type={el.type} value={dataInfo[el.prop]} onChange={(e) => {
            setDataInfo({ ...dataInfo, ...{ [el.prop]: e.target.value } })
          }} />}</p>
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
      <div className={clsx(style.card, toExceedTheTimeLimit(item.date) && style.timeOut)} key={index}>
        <p>{index + 1}</p>
        {infoKV.map((el, index) => <>
          <p key={index}> <span>{el.label}：</span>{formatState(item, el.prop)}</p>
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

