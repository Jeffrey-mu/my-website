import React, { useRef, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import style from './index.module.css'
import { Calendar } from 'antd';
import 'antd/dist/antd.css'
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

;

export default function App() {
  const [markdownState, setMarkdownState] = useState()
  function updateMarkdownState(state) {
    console.log(markdownState)
    setMarkdownState(markdownState, state)
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
        <main>
          <Calendar onPanelChange={onPanelChange} />
        </main>
      </Layout>
    </>
  );
}

