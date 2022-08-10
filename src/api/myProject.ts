import request from '../utils/request'
/**
 * 查询列表
*/
export interface MyProjectModel {
  name: string
  url: string
  description: string
  type: string
}
export function getMyProjectData(): MyProjectModel[] {
  return [{
    name: 'playground',
    url: 'https://playground-pied.vercel.app/',
    description: '我的操场',
  }, {
    name: 'league-of-heroes',
    url: 'https://league-of-heroes-two.vercel.app/',
    description: '英雄联盟数据',
  }, {
    name: 'format-string',
    url: 'https://format-string.vercel.app/',
    description: '数据处理',
  }, {
    name: 'replace-ejs',
    url: 'https://replace-ejs.vercel.app/',
    description: 'ejs模板路径替换',
  }, {
    name: 'random-dog',
    url: 'https://random-img-beryl.vercel.app/',
    description: '随机狗',
  }, {
    name: 'copy-string',
    url: 'https://github.com/Jeffrey-mu/copy-string',
    description: '复制文本',
  }, {
    name: 'format-script',
    url: 'https://format-script.vercel.app/',
    description: '格式化script代码',
  }, {
    name: '50projects50days',
    url: 'https://50projects50days-steel.vercel.app/',
    description: '适合前端初学者做的小项目',
  }, {
    name: 'twilight',
    url: 'https://62b52569b428441cbbf6e669--timely-twilight-315e72.netlify.app/',
    description: '扫雷',
  }, {
    name: 'translate',
    url: 'https://translate-one.vercel.app/',
    description: '使用百度api开发',
  }, {
    name: 'inspirational-quotations',
    url: 'https://inspirational-quotations.vercel.app/',
    description: '随机励志句子',
  }
  ] as MyProjectModel[]
  // return request.get('/myProject')
}
