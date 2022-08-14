import request from '../utils/request'
/**
 * 查询列表
 */
export interface LearnDataModel {
  title: string
  url: string
  description: string
  type: string
  img: string
}
export interface LearnDataTypeModel {
  label: string
  id: number
  sort: number
}
export function getLearnData(): LearnDataModel[] {
  return [
    {
      title: 'golang 电子书',
      description: 'golang 电子书介绍如何使用 golang 构建网络，支持多语言版本',
      url: 'https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/preface.md',
      img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.loserhub.cn%2Fupload%2Fimages%2Fgroups%2F7b0b5429601e403e915e50c67e63eebb%2Fprofilephoto%2Fresized-Golang.jpg&refer=http%3A%2F%2Fwww.loserhub.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663038507&t=786d4fb79c45bff079b3a6a4f4976261',
    },
  ] as LearnDataModel[]
  // return request.get('/myProject')
}
export function getLearnDataType(): LearnDataTypeModel[] {
  return [
    {
      label: 'golang',
      id: 1,
    },
    {
      label: 'vue',
      id: 2,
    },
    {
      label: 'typescript',
      id: 3,
    },
  ] as LearnDataTypeModel[]
  // return request.get('/myProject')
}
