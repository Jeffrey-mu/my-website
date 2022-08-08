import React, { useRef, useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import style from './index.module.css'
import clsx from 'clsx';
import { get } from '../../utils/request'
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};


function ToDoAction() {
  return <>
    <div className={style.toDoAction}>
      <button>添加</button>
    </div>
  </>
}
export default function App() {
  const [card, setCard] = useState([])
  useEffect(() => {
    Fetch({ toType: 'get' })
  }, [])
  interface FetchOptions<T = any> {
    toType?: 'get' | 'edit' | 'delete' | 'append' | 'update',
    data?: T[]
  }
  function Fetch(options?: FetchOptions) {
    get('http://localhost:1323/todo', options).then(res => {
      setCard(JSON.parse(res))
    })
  }
  function Card() {
    return card.map((item, index) =>
      <div className={clsx(style.card)} key={index}>
        <p>序号：{index + 1}</p>
        <p>主题：{item.title}</p>
        <p>描述：{item.content}</p>
        <p>时间：{item.date} 用户：jf</p>
      </div>
    )
  }

  const [markdownState, setMarkdownState] = useState()
  function updateMarkdownState(state) {
    console.log(markdownState)
    setMarkdownState(state)
  }
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <ToDoAction></ToDoAction>
        <main className={style.main}>
          {Card()}
        </main>
      </Layout>
    </>
  );
}

