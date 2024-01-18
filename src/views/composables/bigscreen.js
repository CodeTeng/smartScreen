import { ref } from 'vue'
import { getParkInfoApi } from '@/apis/park.js'
import * as echarts from 'echarts'

// 封装获取数据接口的组合式函数
// 方法名必须以 use 开头
// 把组件内部的逻辑封装到内部方法
// 1.该导入的要导入 (ref, getParkInfoApi)
// 2.封装的函数要导出
// 3.函数内部的数据，如果在外部要使用，还要 return
export function useGetParkInfo() {
  const parkInfo = ref({})
  const getParkInfo = async () => {
    const res = await getParkInfoApi()
    parkInfo.value = res.data
  }
  return {
    parkInfo,
    getParkInfo
  }
}

export function useBarChart(parkInfo) {
  const barChart = ref({})
  const initBarChart = () => {
    // 1. 解构图表数据
    // echarts 必须保证 dom 存在，必须在获取数据后进行渲染
    const parkIncome = parkInfo.value.parkIncome
    // 2. 准备options数据
    const barOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        // 让图表占满容器
        top: '10px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          data: parkIncome.xMonth
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '园区年度收入',
          type: 'bar',
          barWidth: '10px',
          data: parkIncome.yIncome.map((item, index) => {
            const color =
              index % 2 === 0
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.23, color: '#74c0f8' },
                  { offset: 1, color: 'rgba(116,192,248,0.00)' }
                ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.23, color: '#ff7152' },
                  { offset: 1, color: 'rgba(255,113,82,0.00)' }
                ])
            return { value: item, itemStyle: { color } }
          })
        }
      ],
      textStyle: {
        color: '#B4C0CC'
      }
    }
    // 3. 渲染图表
    const myBarChart = echarts.init(barChart.value)
    myBarChart.setOption(barOptions)
  }
  return {
    barChart,
    initBarChart
  }
}

export function usePieChart(parkInfo) {
  const pieChart = ref({})
  const initPieChart = () => {
    const parkIndustry = parkInfo.value.parkIndustry
    const pieOption = {
      color: [
        '#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
      legend: {
        itemGap: 20,
        bottom: '0',
        icon: 'rect',
        itemHeight: 10, // 图例icon高度
        itemWidth: 10, // 图例icon宽度
        textStyle: {
          color: '#c6d1db',
        },
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: '园区产业分析',
          type: 'pie',
          radius: ['55%', '60%'], // 设置内圈与外圈的半径使其呈现为环形
          center: ['50%', '40%'], // 圆心位置， 用于调整整个图的位置
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              return `${params.seriesName}</br><div style='display:flex;justify-content: space-between;'><div>${params.marker}${params.name}</div><div>${params.percent}%</div></div>`
            }
          },
          label: {
            show: false,
            position: 'center',
          },
          data: parkIndustry,
        },
      ],
    }
    const myPieChart = echarts.init(pieChart.value)
    myPieChart.setOption(pieOption)
  }
  return {
    pieChart,
    initPieChart
  }
}
