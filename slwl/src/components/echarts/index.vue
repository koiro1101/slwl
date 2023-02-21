<template>
  <div>
    <div class="box" ref="echarts"></div>
  </div>
</template>
 
<script>

import echarts from './utils/echarts'
import 'echarts-liquidfill'
export default {
  mounted() {
    var myChart = this.$echarts.init(this.$refs.echarts);
 
    var value = 0.45;
    var value1 = 0.76;
 
    var option = {
      backgroundColor: "#0F224C",
      title: [
        {
          text: "本年收缴率",
          x: "center",
          y: "60%",
          textStyle: {
            fontSize: 14,
            fontWeight: "100",
            color: "#5dc3ea",
            lineHeight: 16,
            textAlign: "center",
          },
        },
      ],
      series: [
        {
          type: "liquidFill",
          radius: "47%",
          center: ["50%", "30%"],
          color: [
            {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#446bf5",
                },
                {
                  offset: 1,
                  color: "#2ca3e2",
                },
              ],
              globalCoord: false,
            },
          ],
          data: [value, value], // data个数代表波浪数
          backgroundStyle: {
            borderWidth: 1,
            color: "RGBA(51, 66, 127, 0.7)",
          },
          label: {
            normal: {
              textStyle: {
                fontSize: 20,
                color: "#fff",
              },
            },
          },
          outline: {
            // show: false
            borderDistance: 0,
            itemStyle: {
              borderWidth: 2,
              borderColor: "#112165",
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>
 
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 140px;
}
</style>

