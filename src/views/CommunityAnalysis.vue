<template>
  <el-container>
    <headernav />
    <el-dropdown
      @command="handleCommand"
      style="position: absolute; top: 10vh; left: 190vh"
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
        width: 180vh;
        height: 80vh;
        position: absolute;
        top: 16vh;
        left: 15vh;
      "
      id="chartCommit"
    ></div>
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
          this.kind = "commit";
          this.getDataCommit();
          break;
        case "b":
          this.kind = "issue";
          this.getDataIssue();
          break;
        case "c":
          this.kind = "pull";
          this.getDataPull();
          break;
        case "d":
          this.kind = "commit仓库占比";
          this.getDataCommitWH();
          break;
        case "e":
          this.kind = "issue仓库占比";
          this.getDataIssueWH();
          break;
        case "f":
          this.kind = "pull仓库占比";
          this.getDataPullWH();
          break;
        case "h":
          this.kind = "commit成员占比";
          this.getDataCommitP();
          break;
        case "i":
          this.kind = "issue成员占比";
          this.getDataIssueP();
          break;
        case "j":
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
          that.a = response.data.create_time;
          that.b = response.data.create_count;
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
          that.a = response.data.create_time;
          that.b = response.data.create_count;
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
          that.a = response.data.create_time;
          that.b = response.data.create_count;
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
      console.log("getData");
      var that = this;
      this.$axios.get("/community/repo_count/").then(
        function (response) {
          console.log(response);
          that.a = response.data.commit_list;
          that.initchartCircleWH();
          console.log("created finish");
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
          console.log(response);
          that.a = response.data.issue_list;
          that.initchartCircleWH();
          console.log("created finish");
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
          console.log(response);
          that.a = response.data.pull_list;
          that.initchartCircleWH();
          console.log("created finish");
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataCommitP() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/mem_count/").then(
        function (response) {
          console.log(response);
          that.a = response.data.commit_list;
          that.initchartCircleP();
          console.log("created finish");
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataIssueP() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/mem_count/").then(
        function (response) {
          console.log(response);
          that.a = response.data.issue_list;
          that.initchartCircleP();
          console.log("created finish");
        },
        function (err) {
          console.log(err);
        }
      );
    },
    getDataPullP() {
      console.log("getData");
      var that = this;
      this.$axios.get("/community/mem_count/").then(
        function (response) {
          console.log(response);
          that.a = response.data.pull_list;
          that.initchartCircleP();
          console.log("created finish");
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
    initchartCircle() {
      let mychart = this.$echarts.init(
        document.getElementById("chartCommit"),
        "macarons"
      );
      mychart.setOptionWH({
        title: {
          text: "仓库占比",
          left: "center",
          top: "center",
        },
        series: [
          {
            type: "pie",
            data: [
              {
                value: 335,
                name: "A",
              },
              {
                value: 234,
                name: "B",
              },
              {
                value: 1548,
                name: "C",
              },
            ],
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