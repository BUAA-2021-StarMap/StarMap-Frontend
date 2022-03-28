<template>
  <div class="Charts">
    <!-- 总图1 -->
    <v-row>
      <v-col class="fpic">
        <v-card class="pic_card">
          <div class="pic" id="fone" style="width: 70vw; height: 50vh ; align: center" ></div>
        </v-card>
      </v-col>
    </v-row>
    <!-- 粉丝图 -->
    <v-row>
      <v-col class="ffan">
        <v-card class="fan_card">
          <div class="fan" id="ftwo" style="width: 70vw; height: 50vh"></div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import user from '@/store/user'
import themeone from "../style/theme";
export default {
  name: "CustomerCharts",
  data() {
    return {
      items: [
        {
          username: "Harbour",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 1,
          pull_request: 1,
          commit: 1,
          issues: 2,
          lastactivetime: "2021-2-2",
        },
        {
          username: "Harbo2",
          userid: 2037363,
          userimage: "",
          usermotto: "To be or to be",
          usertoken: ["python", "bablabal", "c++", "java", "linux"],
          fans: 2,
          pull_request: 2,
          commit: 2,
          issues: 2,
          lastactivetime: "2022-2-2",
        },
        {
          username: "Harbour3",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c+++++", "java", "linux"],
          fans: 3,
          pull_request: 3,
          commit: 3,
          issues: 3,
          lastactivetime: "2023-2-2",
        },
        {
          username: "Harbour4",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 4,
          pull_request: 4,
          commit: 4,
          issues: 4,
          lastactivetime: "2024-2-2",
        },
        {
          username: "Harbour5",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 5,
          pull_request: 5,
          commit: 5,
          issues: 5,
          lastactivetime: "2025-2-2",
        },
        {
          username: "Harbour6",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 6,
          pull_request: 6,
          commit: 6,
          issues: 6,
          lastactivetime: "2026-2-2",
        },
        {
          username: "Harbour7",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 7,
          pull_request: 7,
          commit: 7,
          issues: 7,
          lastactivetime: "2027-2-2",
        },
        {
          username: "Harbour8",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 8,
          pull_request: 8,
          commit: 8,
          issues: 8,
          lastactivetime: "2028-2-2",
        },
        {
          username: "Harbour9",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 9,
          pull_request: 9,
          commit: 9,
          issues: 9,
          lastactivetime: "209-2-2",
        },
        {
          username: "Harbour11",
          userid: 20373638,
          userimage: "",
          usermotto: "To be or not to be",
          usertoken: ["python", "ppycharm", "c++", "java", "linux"],
          fans: 11,
          pull_request: 11,
          commit: 11,
          issues: 11,
          lastactivetime: "20288-2-2",
        },
      ],
    };
  },
  methods: {
    getType(type) {
      //let items=Vue.prototype.$vi_user;
      //let item=this.items;
      let a = [],
        b = [],
        c = [],
        d = [],
        e = [];
      let i = 0;
      for (; i < this.items.length; ) {
        let key = this.items[i];
        a[i] = key["LOGIN"];
        b[i] = key["FOLLOWERS_COUNT"];
        c[i] = key["PULLS_COUNT"];
        d[i] = key["COMMITS_COUNT"];
        e[i] = key["ISSUES_COUNT"];
        i++;
      }
      // console.log(a);
      // console.log(e);
      switch (type) {
        case 0:
          return a;
        case 1:
          return b;
        case 2:
          return c;
        case 3:
          return d;
        case 4:
          return e;
      }
    },
    initcharts() {
      this.$echarts.registerTheme("theme", themeone);
      let mycharts1 = this.$echarts.init(
        document.getElementById("fone"),
        "theme"
      );
      // let mycharts1_s1 = this.$echarts.init(
      //   document.getElementById("fone_sone"),
      //   "theme"
      // );
      // let mycharts1_s2 = this.$echarts.init(
      //   document.getElementById("fone_stwo"),
      //   "theme"
      // );
      // let mycharts1_s3 = this.$echarts.init(
      //   document.getElementById("fone_sthree"),
      //   "theme"
      // );
      let mycharts2 = this.$echarts.init(
        document.getElementById("ftwo"),
        "theme"
      );
      console.log("enter");
      let xdata = this.getType(0);
      let fandata = this.getType(1);
      let pulldata = this.getType(2);
      let comdata = this.getType(3);
      let issdata = this.getType(4);
      // console.log(xdata);
      //三个指标进行堆积
      mycharts1.setOption({
        title: {
          text: "活跃度分析",
          fontFamily: "sans-serif",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          data: xdata,
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {},
        series: [
          {
            name: "pull_request",
            emphasis: {
              focus: "series",
            },
            data: pulldata,
            type: "bar",
            stack: "x",
          },
          {
            name: "commits",
            emphasis: {
              focus: "series",
            },
            data: comdata,
            type: "bar",
            stack: "x",
          },
          {
            name: "issues",
            emphasis: {
              focus: "series",
            },
            data: issdata,
            type: "bar",
            stack: "x",
          },
        ],
      });
      //Fans
      let ans=[],i=0;
      for(;i<xdata.length;i++){
        ans[i]={value: fandata[i],name: xdata[i]};
      }
      console.log(ans);
      mycharts2.setOption({
        title: {
          text: "粉丝数分析",
          //subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "粉丝数",
            type: "pie",
            radius: "50%",
            data: ans,
            // [
            //   { value: fandata[0], name: xdata[0]},//+" : "+fandata[0] },
            //   { value: fandata[1], name: xdata[1]},//+" : "+fandata[1] },
            //   { value: fandata[2], name: xdata[2]},//+" : "+fandata[2] },
            //   { value: fandata[3], name: xdata[3]},//+" : "+fandata[3] },
            //   { value: fandata[4], name: xdata[4]},//+" : "+fandata[4] },
            //   { value: fandata[5], name: xdata[5]},//+" : "+fandata[5] },
            //   { value: fandata[6], name: xdata[6]},//+" : "+fandata[6] },
            //   { value: fandata[7], name: xdata[7]},//+" : "+fandata[7] },
            //   { value: fandata[8], name: xdata[8]},//+" : "+fandata[8] },
            //   { value: fandata[9], name: xdata[9]},//+" : "+fandata[9] },
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
  mounted() {
    this.initcharts();
    console.log("entermounted");
  },
  created(){
    this.items= user.getters.getUser(user.state()).user.search;
  }
};
</script>
<style scoped>
.fpic {
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 0vh;
  padding-bottom: 5vh;
  /* background-color: #efa18d; */
}
.pic_card {
  padding-left: 10vw;
  padding-right: 10vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
}
.pic{
  align-content: center;
}
.ffan {
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5vh;
  padding-bottom: 5vh;
  /* background-color: #efa18d; */
}
.fan_card {
  padding-left: 10vw;
  padding-right: 10vw;
  padding-top: 5vh;
  padding-bottom: 2vh;
}
</style>