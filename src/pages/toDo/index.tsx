import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import style from './index.module.css'
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import dayjs from 'dayjs'
import { getTodoData, addTodoData, delTodoData } from '../../api/todo'
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
  state: number
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
  const [active, setActive] = useState<number>(-1)
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [dataInfo, setDataInfo] = useState<ToDo>()
  function toExceedTheTimeLimit(time: string) {
    let nowTime = +new Date
    let targetTime = + new Date(time)
    return nowTime >= targetTime
  }
  interface Radio {
    name: string
    value: string
  }
  interface DataInfoKV {
    prop: string,
    label: string,
    type: 'text' | 'datetime-local' | 'radio',
    option?: Radio[]
  }
  const infoKV: DataInfoKV[] = [
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
      type: 'radio',
      option: [
        { name: 'name', value: 'jiaf' },
        { name: 'name', value: 'muci' }
      ]
    },
    // {
    //   prop: 'state',
    //   label: '进度',
    //   type: 'select',
    // }
  ]
  useEffect(() => {
    getData()
  }, [])

  async function getData(options?: FetchOptions) {
    let data = await getTodoData()
    setCard(data)
    setShowAdd(false)
  }
  function resetActive() {
    setActive(-1)
  }
  function resetDataInfo(info?: ToDo) {
    setDataInfo({
      title: '',
      description: '',
      date: dayjs().format("YYYY-MM-DD hh:mm:ss"),
      name: '',
      state: 0
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
          TAB_BTN.map(item => <span key={item.name} style={item.value === toDoTab ? { color: '#2e8555' } : {}} onClick={() => {
            setToDoTab(item.value)
            resetActive()
          }}>{item.name}</span>)
        }
      </div>
    </>
  }

  function ToDoAction() {
    return <>
      <div className={style.toDoAction}>
        <Link
          className="button button--secondary button--lg" onClick={
            () => {
              setShowAdd(true)
              resetDataInfo()
            }
          }>
          添加事件
        </Link>
        {
          active !== -1 && <>
            <Link
              className="button button--secondary button--lg" onClick={
                () => {
                  setShowAdd(true)
                  setDataInfo(card.find(el => el.id === active))
                }
              }>
              修改事件
            </Link>
            <Link
              className="button button--secondary button--lg" onClick={
                async () => {
                  await delTodoData({ id: active })
                  getData()
                  resetActive()
                }
              }>
              删除事件
            </Link>
          </>
        }

      </div>
    </>
  }

  async function insert() {
    dataInfo.date = dayjs(dataInfo.date).format('YYYY-MM-DD HH:mm:ss');
    await addTodoData({ ...dataInfo, id: card.at(-1).id + 1 })
    getData()
  }

  function addData() {
    return showAdd && <div className={clsx(style.dialog_mask)}>
      <div className={clsx(style.card, style.dialog)}>
        <p>{card.length + 1}</p>
        {infoKV.map((el, index) =>
          <>
            <p key={el.label}> <span>{el.label}：</span> {

              el.type === 'radio' ?
                // @ts-ignore
                el.option.map(op => <><label htmlFor="" key={op.value}>
                  {op.value}</label> <input {...op} key={op.value} type={el.type} value={dataInfo[el.prop]} onChange={(e) => {
                    setDataInfo({ ...dataInfo, ...{ [el.prop]: op.value } })
                  }} /></>)
                : <input type={el.type} key={el.label} value={dataInfo[el.prop]} onChange={(e) => {
                  setDataInfo({ ...dataInfo, ...{ [el.prop]: e.target.value } })
                }} />

            }</p>
          </>
        )}
        <button onClick={insert}>提交</button>
        <button onClick={() => {
          setShowAdd(false)
        }}>取消</button>
      </div>
    </div >
  }

  function Card() {
    const f = toExceedTheTimeLimit
    const newCard = card.filter(c => toDoTab === 'c' ? !f(c.date) && c : f(c.date) && c)
    return newCard.map((item, index) =>
      <div title="点击选择" onClick={() => setActive(item.id)} className={clsx(style.card, active === item.id && style.active, f(item.date) && style.timeOut)} key={item.id}>
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
