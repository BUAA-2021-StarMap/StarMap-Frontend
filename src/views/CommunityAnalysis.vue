<template>
  <el-container>
    <headernav />
    <el-dropdown
      @command="handleCommand"
      style="position: absolute; top: 10vh; left: 185vh"
    >
      <span class="el-dropdown-link">
        {{ kind }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">commit</el-dropdown-item>
        <el-dropdown-item command="b">issue</el-dropdown-item>
        <el-dropdown-item command="c">pull</el-dropdown-item>
        <el-dropdown-item command="d">commit仓库占比</el-dropdown-item>
        <el-dropdown-item command="e">issue仓库占比</el-dropdown-item>
        <el-dropdown-item command="f">pull仓库占比</el-dropdown-item>
        <el-dropdown-item command="h">commit成员占比</el-dropdown-item>
        <el-dropdown-item command="i">issue成员占比</el-dropdown-item>
        <el-dropdown-item command="j">pull成员占比</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div
      style="
        background-color: white;
        weight: 180vh;
        height: 80vh;
        position: absolute;
        top: 16vh;
        left: 15vh;
      "
    >
      <div
        style="width: 180vh; height: 80vh"
        id="chartCommit"
        v-if="lineChart"
      ></div>
      <div
        style="width: 180vh; height: 80vh"
        id="chartWH"
        v-if="PieChart"
      ></div>
    </div>
  </el-container>
</template>
<script>
import headernav from "@/components/HeadVue.vue";
import "echarts/lib/component/grid";
import "../style/macarons.js";

export default {
  name: "DataView",
  components: { headernav },
  data() {
    return {
      a: [],
      b: [],
      PieChart: 0,
      lineChart: 1,
      kind: "commit",
    };
  },

  mounted() {
    this.getDataCommit();
  },

  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          this.lineChart = 1;
          this.PieChart = 0;
          this.this.kind = "commit";
          this.getDataCommit();
          break;
        case "b":
          this.lineChart = 1;
          this.PieChart = 0;
          this.kind = "issue";
          this.getDataIssue();
          break;
        case "c":
          this.lineChart = 1;
          this.PieChart = 0;
          this.kind = "pull";
          this.getDataPull();
          break;
        case "d":
          this.lineChart = 0;
          this.PieChart = 1;
          this.kind = "commit仓库占比";
          this.getDataCommitWH();
          break;
        case "e":
          this.lineChart = 0;
          this.PieChart = 1;
          this.kind = "issue仓库占比";
          this.getDataIssueWH();
          break;
        case "f":
          this.lineChart = 0;
          this.PieChart = 1;
          this.kind = "pull仓库占比";
          this.getDataPullWH();
          break;
        case "h":
          this.lineChart = 0;
          this.PieChart = 1;
          this.kind = "commit成员占比";
          this.getDataCommitP();
          break;
        case "i":
          this.lineChart = 0;
          this.PieChart = 1;
          this.kind = "issue成员占比";
          this.getDataIssueP();
          break;
        case "j":
          this.lineChart = 0;
          this.PieChart = 1;
          this.kind = "pull成员占比";
          this.getDataPullP();
          break;
      }
    },
    getDataCommit() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/element_time/").then(
        function (response) {
          console.log(response);
          that.a = response.data.commit_create_time;
          that.b = response.data.commit_create_count;
          console.log("a: " + that.a);
          console.log("b: " + that.b);
          that.initchart2();
          console.log("created finish");
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataIssue() {
      console.log("getDataIssue");
      var that = this;
      this.$axios.get("/community/element_time/").then(
        function (response) {
          console.log(response);
          that.a = response.data.issue_create_time;
          that.b = response.data.issue_create_count;
          console.log("a: " + that.a);
          console.log("b: " + that.b);
          that.initchart1();
          console.log("created finish");
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataPull() {
      console.log("getDataIssue");
      var that = this;
      this.$axios.get("/community/element_time/").then(
        function (response) {
          console.log(response);
          that.a = response.data.pull_create_time;
          that.b = response.data.pull_create_count;
          console.log("a: " + that.a);
          console.log("b: " + that.b);
          that.initchart1();
          console.log("created finish");
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataCommitWH() {
      console.log("getDataCWH");
      var that = this;
      this.$axios.get("/community/repo_count/").then(
        function (response) {
          let i = 0,
            pie = [];
          console.log(response);
          that.a = response.data.commit_list;
          for (; i < that.a.length; i++) {
            pie[i] = {
              value: that.a[i][1],
              name: that.a[i][0],
            };
          }
          console.log(pie);
          that.initchartCircleWH(pie);
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataIssueWH() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/repo_count/").then(
        function (response) {
          let i = 0,
            pie = [];
          console.log(response);
          that.a = response.data.issue_list;
          for (; i < that.a.length; i++) {
            pie[i] = {
              value: that.a[i][1],
              name: that.a[i][0],
            };
          }
          console.log(pie);
          that.initchartCircleWH(pie);
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataPullWH() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/repo_count/").then(
        function (response) {
          let i = 0,
            pie = [];
          console.log(response);
          that.a = response.data.pull_list;
          for (; i < that.a.length; i++) {
            pie[i] = {
              value: that.a[i][1],
              name: that.a[i][0],
            };
          }
          console.log(pie);
          that.initchartCircleWH(pie);
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataCommitP() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/member_count/").then(
        function (response) {
          let i = 0,
            pie = [];
          console.log(response);
          that.a = response.data.commit_list;
          for (; i < that.a.length; i++) {
            pie[i] = {
              value: that.a[i][1],
              name: that.a[i][0],
            };
          }
          console.log(pie);
          that.initchartCircleWH(pie);
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataIssueP() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/member_count/").then(
        function (response) {
          let i = 0,
            pie = [];
          console.log(response);
          that.a = response.data.issue_list;
          for (; i < that.a.length; i++) {
            pie[i] = {
              value: that.a[i][1],
              name: that.a[i][0],
            };
          }
          console.log(pie);
          that.initchartCircleWH(pie);
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataPullP() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/member_count/").then(
        function (response) {
          let i = 0,
            pie = [];
          console.log(response);
          that.a = response.data.pull_list;
          for (; i < that.a.length; i++) {
            pie[i] = {
              value: that.a[i][1],
              name: that.a[i][0],
            };
          }
          console.log(pie);
          that.initchartCircleWH(pie);
        },
        function (err) {
          console.log(err);
        }
      );
    },
    initchart1() {
      //   this.$echarts.registerTheme("macarons", JSON.parse(themeJSON));
      console.log("initchart");
      let mychart = this.$echarts.init(
        document.getElementById("chartCommit"),
        "macarons"
      );
      mychart.setOption({
        title: {
          text: "社区分析",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        xAxis: {
          name: "date",
          type: "category",
          axisLabel: {
            interval: 30,
          },
          boundaryGap: false,
          data: this.a,
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //   color: "rgba(62, 200, 238, 0.75)",
              color: "black",
            },
          },
        },
        series: [
          {
            name: "commit",
            data: this.b,
            type: "line",
            symbolSize: 8,
            smooth: true,
          },
        ],
      });
    },
    initchart2() {
      //   this.$echarts.registerTheme("macarons", JSON.parse(themeJSON));
      console.log("initchart");
      let mychart = this.$echarts.init(
        document.getElementById("chartCommit"),
        "macarons"
      );
      mychart.setOption({
        title: {
          text: "社区分析",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        xAxis: {
          name: "date",
          type: "category",
          axisLabel: {
            interval: 200,
            fontSize: 10,
            color: "#657c97",
          },
          boundaryGap: false,
          data: this.a,
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              //   color: "rgba(62, 200, 238, 0.75)",
              color: "black",
            },
          },
        },
        series: [
          {
            name: "commit",
            data: this.b,
            type: "line",
            symbolSize: 8,
            smooth: true,
          },
        ],
      });
    },
    initchartCircleWH(c) {
      console.log(c);
      let mychart = this.$echarts.init(
        document.getElementById("chartWH"),
        "macarons"
      );
      mychart.setOption({
        title: {
          text: "仓库占比",
          left: "center",
          top: "center",
        },
        series: [
          {
            type: "pie",
            data: c,
            radius: ["40%", "70%"],
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>