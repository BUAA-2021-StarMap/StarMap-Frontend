<template>
  <el-container>
    <headernav />
    <div
      style="
        width: 100vh;
        height: 80vh;
        position: absolute;
        top: 10vh;
        left: 70vh;
      "
      id="chart"
    ></div>
  </el-container>
</template>
<script>
import headernav from "@/components/HeadVue.vue";
import "echarts/lib/component/grid";

export default {
  name: "DataView",
  components: { headernav },
  data() {
    return {};
  },
  methods: {
    initchart() {
      //   this.$echarts.registerTheme("macarons", JSON.parse(themeJSON));
      let mychart = this.$echarts.init(
        document.getElementById("chart")
        // "macarons"
      );
      mychart.setOption({
        title: {
          text: "xxxx",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "value",
          //   axisLabel: {
          //     interval: 0,
          //   },
          //   boundaryGap: false,
          data: [1, 2, 3, 4, 5],
        },

        yAxias: {
          type: "value",
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLine: {
          //     lineStyle: {
          //       //   color: "rgba(62, 200, 238, 0.75)",
          //       color: "black",
          //     },
          //   },
        },
        series: [
          {
            // name: "commit",
            data: [200, 7600, 7300, 9800, 2500],
            type: "line",
            smooth: true,
            // symbolSize: 8,
          },
        ],
      });
    },
  },
  mounted() {
    this.initchart();
    console.log("chart");
  },
};
</script>
<style scoped>
</style>