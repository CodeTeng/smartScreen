import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import('@/styles/common.scss')
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

// 使用乾坤渲染
renderWithQiankun({
  // 挂载时
  mount (props) {
    console.log('mount')
    render(props)
  },
  bootstrap () {
    console.log('bootstrap')
  },
  unmount (props) {
    console.log('unmount', props)
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}

function render (props = {}) {
  const { container } = props
  const app = createApp(App)
  app.use(router)
  app.mount(container ? container.querySelector("#app") : "#app")
}
