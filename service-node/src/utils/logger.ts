import dayjs from 'dayjs'
import logger from 'pino'
const log = logger({
  prettifier: true,
  base: {
    pid: false, //进程id
  },
  timestamp: () => `"time":"${dayjs().format()}"`,
})

export default log
