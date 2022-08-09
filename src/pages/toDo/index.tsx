import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import style from './index.module.css'
import clsx from 'clsx';
import { get } from '../../utils/request'
import Link from '@docusaurus/Link';
import dayjs from 'dayjs'

const stateName = ['未开始', '已收到', '进行中', '已完成']
function formatState(item, prop) {
  if (prop === 'state') {
    return stateName[item[prop]]
  }
  return item[prop]
}
interface ToDo {
  title: string
  description: string
  date: string
  name: string
  id?: number
}
type ToDoTab = 'c' | 'h'
type FetchType = 'get' | 'edit' | 'delete' | 'insert' | 'update'
interface FetchOptions<T = any> {
  toType?: FetchType,
  data?: T
}
interface TAB_BTN {
  name: string
  value: ToDoTab
}
export default function App() {
  const [card, setCard] = useState<ToDo[]>([])
  const [toDoTab, setToDoTab] = useState<ToDoTab>('c')
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [dataInfo, setDataInfo] = useState<ToDo>({
    title: '',
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
    },
    // {
    //   prop: 'description',
    //   label: '描述',
    //   type: 'text',
    // },
    {
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

  function Fetch(options?: FetchOptions) {
    get('http://101.200.33.150:1323/todo', options).then(res => {
      console.log(res)
      const data = JSON.parse(res) as ToDo[]
      console.log(data)
      data.sort((a, b) => +new Date(a.date) - +new Date(b.date))
      console.log(data)
      setCard(data)
      setShowAdd(false)
    })
  }

  function ToDoTab() {
    const TAB_BTN: TAB_BTN[] = [
      {
        name: '当前事件',
        value: 'c'
      }, {
        name: '历史事件',
        value: 'h'
      },
    ]
    return <>
      <div className={style.ToDoTab}>
        {
          TAB_BTN.map(item => <span style={item.value === toDoTab ? { color: '#2e8555' } : {}} onClick={setToDoTab.bind(null, item.value)}>{item.name}</span>)
        }
      </div>
    </>
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
    const f = toExceedTheTimeLimit
    const newCard = card.filter(c => toDoTab === 'c' ? !f(c.date) && c : f(c.date) && c)
    return newCard.map((item, index) =>
      <div className={clsx(style.card, f(item.date) && style.timeOut)} key={index}>
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
        <ToDoTab />
        <ToDoAction />
        <main className={style.main}>
          {Card()}
          {addData()}
        </main>
      </Layout>
    </>
  );
}

