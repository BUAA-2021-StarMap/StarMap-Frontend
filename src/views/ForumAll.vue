<template>
  <div>
    <div>
      <img
        src="../pic/star/StarBackground1.png"
        alt=""
        class="StarBackground1"
      />
      <img
        src="../pic/star/StarBackground2.png"
        alt=""
        class="StarBackground2"
      />
      <img
        src="../pic/star/StarBackground3.png"
        alt=""
        class="StarBackground3"
      />
    </div>
    <headerhb />
    <div class="m-container">
      <div class="subhead">
        <v-btn class="subheadbt" type="primary" @click="addforum"
          >发表文章</v-btn
        >
        <v-btn class="subheadbt" type="primary" @click="listGit">排行榜</v-btn>
        <v-btn class="subheadbt" type="primary" @click="analyseCom"
          >社区分析</v-btn
        >
      </div>
      <!-- <el-button type="primary" @click="logout">登&nbsp;出</el-button> -->
      <div class="timeline">
        <el-timeline>
          <el-timeline-item
            v-bind:timestamp="changetime(art.created_time)"
            placement="top"
            v-for="art in articles"
            :key="art.article_id"
          >
            <el-card class="TLcard">
              <v-row class="TLtitle">
                <h4 class="title">
                  <router-link
                    :to="{
                      name: 'ForumDetails',
                      params: { articleId: art.article_id },
                    }"
                    class="cardtitle"
                    >{{ art.title }}</router-link
                  >
                </h4>
              </v-row>
              <v-row class="TLfoot">
                <v-col class="footleft">
                  <p class="messages">
                    {{ "浏览：" + art.views + "  评论：" + art.comment }}
                  </p>
                </v-col>
                <v-col class="footright">
                  <p class="author">{{ "by  " + art.user_name }}</p>
                </v-col>
              </v-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <router-view></router-view>

      <!-- <el-pagination
      class="mpage"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="page"
      :total="total"
    >
    </el-pagination> -->
      <!-- 换页的功能之后再加 -->
    </div>
  </div>
</template>
<script>
//import Header from "@/components/Header"; 如果定义导航栏作为组件则直接import即可
import user from "@/store/user";
import headerhb from "@/components/HeadVue.vue";
export default {
  name: "ForumAll",
  components: { headerhb },
  data() {
    return {
      articles: {},
      //   currentPage: 1,
      //   total: 0,
      //   pageSize: 5,
    };
  },
  methods: {
    logout() {
      console.log("logout");
      this.$axios({
        methods: "get",
        url: "/user/logout/",
      }).then((res) => {
        console.log(res), this.$router.push("/");
      });
    },
    addforum() {
      this.$router.push("/forum/add");
    },
    listGit() {
      this.$router.push("/sort");
    },
    analyseCom() {
      this.$router.push("/forum");
    },
    changetime(created_time) {
      let ans = created_time.split(/[T:]/);
      return ans[0] + " " + ans[1] + ":" + ans[2];
    },
  },
  created() {
    const userInfo = user.getters.getUser(user.state());
    console.log(userInfo);
    let aData = new Date();
    console.log(aData); //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)

    let dateValue =
      aData.getFullYear() +
      "-" +
      (aData.getMonth() + 1) +
      "-" +
      aData.getDate();
    console.log(dateValue);
    this.$axios({
      methods: "get",
      url: "/forum/all/",
    }).then((res) => {
      console.log("forumall");
      console.log(res);
      if (res.data.result == 1) {
        this.articles = res.data.article;
      } else {
        this.$message.error(res.data.message);
      }
    });
    //}
  },
};
</script>

<style scoped>
.StarBackground1 {
  position: absolute;
  top: 320px;
  left: 260px;
  background-color: transparent;
  height: 400px;
  z-index: -1;
  filter: brightness(90%);
  filter: contrast(90%);
}
.StarBackground2 {
  position: absolute;
  top: 70px;
  left: 950px;
  background-color: transparent;
  height: 400px;
  z-index: -1;
  filter: brightness(90%);
  filter: contrast(90%);
}
.StarBackground3 {
  opacity: 0.8;
  position: absolute;
  left: 70px;
  top: -70px;
  width: 1460px;
  z-index: -1;
  filter: brightness(90%);
  filter: contrast(90%);
}
.messages {
  font-family: "SimSun";
  font-size: 2vh;
}
.author {
  font-family: "SimSun";
  font-size: 2.5vh;
  font-style: normal;
  color: black;
}

.m-container {
  margin-top: 13vh;
}
.m-container .subhead {
  position: relative;
  display: block;
  margin: 50px 0px 50px 0px;
  width: 100%;
}
.m-container .subheadbt {
  font-size: 20px;
  background: linear-gradient(to left, rgb(110, 192, 230), rgb(179, 226, 235));
  color: white;
  margin-left: 3vw;
  margin-right: 3vw;
  box-shadow: 2px 2px 5px 2px rgb(136, 200, 211);
}
.el-timeline {
  margin-left: 15vw;
  margin-right: 15vw;
}
::v-deep .el-timeline-item__timestamp.is-top {
  display: inline-block;
  width: 100%;
  font-size: 18px;
  text-align: right;
  color: black;
}
.title {
  margin-top: 0px;
  font-size: 25px;
  font-display: inline-block;
  text-align: left;
}
.TLcard {
  height: 15vh;
  background: linear-gradient(
    45deg,
    rgba(250, 237, 123, 0.4),
    rgba(239, 243, 194, 0.4)
  );
  border: none;
  border-radius: 2vh;
}
.TLtitle {
  height: 10vh;
}
.TLfoot {
  height: 7vh;
  margin: -1vh;
}
.cardtitle {
  margin-top: 2vh;
  margin-left: 2vh;
  text-decoration: none;
  color: black;
  font-size: 23px;
  font-family: "SimSun";
  font-weight: lighter;
}
.footleft {
  text-align: left;
  color: #aaaaaa;
}
.footright {
  text-align: right;
  font-style: italic;
  /* font-weight: bold; */
  color: black;
}
.mpage {
  margin: 0 auto;
  text-align: center;
}
</style>