import React, { useState, useEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import _ from 'lodash'
import style from './index.module.css'
export default function App() {
  const [data_info, setData_info] = useState(
    [`${new Date().getMonth() + 1 + '.' + new Date().getDate()}工作计划`,
      '亚马逊账号日常维护',
      'dv优化，上素材和订单项',
      'Start.IO数据api对接',
      '产品化开发，GoogleAPI对接',
      '新客审核质控',
      '整体流量质控，GA监测反馈',
      '客户服务平台客户管理细节设计'
    ])

  useEffect(() => {
    if (isTrue())
      setData_info([`${new Date().getMonth() + 1 + '.' + new Date().getDate()}工作计划`, ...JSON.parse(localStorage.getItem('data_info')).slice(1)])
  }, [])
  function isTrue() {
    return localStorage.getItem('data_info')
  }
  function handleDel(value) {
    let data = data_info
    data.splice(value, 1)
    setData_info([...data])
  }
  function handleAdd() {
    setData_info([...data_info, ''])

  }
  function handleCopy() {
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'absolute';
    textarea.style.clip = 'rect(0 0 0 0)';
    // 赋值
    textarea.value = data_info.map((item, index) =>
      index ? index + '、' + item : item
    ).join('\n');
    // 选中
    textarea.select();

    // 复制
    document.execCommand('copy', true);
    document.body.removeChild(textarea);
    localStorage.setItem('data_info', JSON.stringify(data_info))
  }
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
      >
        <div className={style.workPlanCard}>
          <h3>工作计划</h3>
          {data_info.map((item, index) =>
            <>
              <div>
                {index ? index + '、' : ''} {item}
              </div>
            </>
          )
          }
        </div>

        <div className={style.workPlanEdit}>
          <h3>编辑区域</h3>
          {data_info.map((item, index) => <>
            <div>
              {
                index ? (
                  <>
                    <input
                      className={style.input}
                      key={index}
                      type="text"
                      value={item}
                      onChange={(e) => {
                        data_info[index] = e.target.value;
                        setData_info([
                          ...data_info,
                        ])
                      }} />
                    <button className={style.del} onClick={handleDel.bind(null, index)}>x</button>
                  </>) : <></>
              }
            </div></>
          )
          }
          <div className={style.buttonBox}>
            <button className={style.copy} onClick={handleCopy}>copy</button>
            <button className={style.add} onClick={handleAdd}>add</button>
          </div>
        </div >
      </Layout>
    </>
  )
}
