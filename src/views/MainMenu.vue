<template>
  <div id="search" class="bg">
    <img
      src="../pic/star/StarBackground1.png"
      alt=""
      class="StarBackground1"
      v-if="light"
    />
    <img
      src="../pic/star/StarBackgroundBlue1.png"
      alt=""
      class="StarBackground1"
      v-if="dark"
    />
    <img
      src="../pic/star/StarBackground2.png"
      alt=""
      class="StarBackground2"
      v-if="light"
    />
    <img
      src="../pic/star/StarBackgroundBlue2.png"
      alt=""
      class="StarBackground2"
      v-if="dark"
    />
    <div>
      <img
        src="../pic/star/StarBackground3.png"
        alt=""
        class="StarBackground3"
        v-if="light"
      />
    </div>
    <div>
      <img
        src="../pic/star/StarBackgroundBlue3.png"
        alt=""
        class="StarBackground3"
        v-if="dark"
      />
    </div>
    <!-- 搜索框部分 -->
    <header class="SearchInput">
      <img
        src="../pic/logo_dark.png"
        @click="changeDark"
        v-if="dark"
        class="change outline"
      />
      <img
        src="../pic/logoYellow.png"
        @click="changeLight"
        v-if="light"
        class="change outline"
      />
      <el-input
        placeholder="请输入问题"
        v-model="message"
        clearable
        v-if="light"
        class="outline transition inputLight"
      >
      </el-input>

      <v-card-actions>
        <el-input
          class="outline transition inputDark"
          placeholder="请输入tag"
          v-model="tag"
          v-if="dark"
        ></el-input>
        <button
          @click="ShowTag"
          class="outline icomoon TagButton transition"
          v-if="dark"
        >
          
        </button>
      </v-card-actions>
      <v-expand-transition>
        <div class="expand_for_tags" v-show="tagsshow">
          <v-chip
            class="EachTag"
            outlined
            color="black"
            text-color="white"
            v-for="(key, index) in completeTags"
            :key="index"
            @click="inputTag(key)"
          >
            {{ key["TAG"] }}
          </v-chip>
        </div>
      </v-expand-transition>
      <!-- <div class="outline tag"></div> -->
      <el-row>
        <el-button
          class="icomoon outline transition searchDark"
          @click="SendMessage"
          v-if="light"
          icon="el-icon-search"
          circle
        ></el-button>
        <el-button
          class="icomoon outline transition searchLight"
          @click="SendTag"
          v-if="dark"
          icon="el-icon-search"
          circle
        ></el-button>
      </el-row>
    </header>
    <headerhb />

    <el-container>
      <!-- 排行榜部分 -->
      <el-main
        class="leaderboard"
        :class="[light ? 'blockLight' : 'blockDark']"
      >
        <p class="BlockTitle">
          <a
            href="/sort"
            v-text="light ? 'Commits Rank' : 'Followers Rank'"
            :class="[light ? 'blockLinkLight' : 'blockLinkDark']"
            class="transition"
          ></a>
        </p>
        <p class="RankText RankOne">
          <a href="#">
            <img
              :src="AvatarOne"
              alt=""
              :class="[light ? 'LittleAvatarLight' : 'LittleAvatarDark']"
            /> </a
          ><br />
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            >&nbsp;</span
          >
          <a href="#" :class="[light ? 'blockLinkLight' : 'blockLinkDark']">{{
            PersonOne
          }}</a>
        </p>

        <p class="RankText RankTwo">
          <a href="#">
            <img
              :src="AvatarTwo"
              alt=""
              :class="[light ? 'LittleAvatarLight' : 'LittleAvatarDark']"
            /> </a
          ><br />
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            >&nbsp;</span
          >
          <a href="#" :class="[light ? 'blockLinkLight' : 'blockLinkDark']">{{
            PersonTwo
          }}</a>
        </p>

        <p class="RankText RankThree">
          <a href="#">
            <img
              :src="AvatarThree"
              alt=""
              :class="[light ? 'LittleAvatarLight' : 'LittleAvatarDark']"
            /> </a
          ><br />
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            >&nbsp;</span
          >
          <a href="#" :class="[light ? 'blockLinkLight' : 'blockLinkDark']">{{
            PersonThree
          }}</a>
        </p>

        <p class="RankText RankFour">
          <a href="#">
            <img
              :src="AvatarFour"
              alt=""
              :class="[light ? 'LittleAvatarLight' : 'LittleAvatarDark']"
            /> </a
          ><br />
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            >&nbsp;</span
          >
          <a href="#" :class="[light ? 'blockLinkLight' : 'blockLinkDark']">{{
            PersonFour
          }}</a>
        </p>

        <p class="RankText RankFive">
          <a href="#">
            <img
              :src="AvatarFive"
              alt=""
              :class="[light ? 'LittleAvatarLight' : 'LittleAvatarDark']"
            /> </a
          ><br />
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            >&nbsp;</span
          >
          <a href="#" :class="[light ? 'blockLinkLight' : 'blockLinkDark']">{{
            PersonFour
          }}</a>
        </p>
      </el-main>
      <!-- 论坛部分 -->
      <el-main class="forum" :class="[light ? 'blockLight' : 'blockDark']">
        <p class="BlockTitle">
          <a
            href="/forum"
            :class="[light ? 'blockLinkLight' : 'blockLinkDark']"
            class="transition"
            >论坛</a
          >
        </p>

        <p class="ForumText ForumOne">
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            > 1</span
          ><br />
          <a
            :href="article1"
            :class="[light ? 'blockLinkLight' : 'blockLinkDark']"
            >{{ TitleOne }}</a
          >
        </p>

        <p class="ForumText ForumTwo">
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            > 2</span
          ><br />
          <a
            :href="article2"
            :class="[light ? 'blockLinkLight' : 'blockLinkDark']"
            >{{ TitleTwo }}</a
          >
        </p>

        <p class="ForumText ForumThree">
          <span
            class="icomoon transition"
            :class="[light ? 'FireAndNumLight' : 'FireAndNumDark']"
            > 3</span
          ><br />
          <a
            :href="article3"
            :class="[light ? 'blockLinkLight' : 'blockLinkDark']"
            >{{ TitleThree }}</a
          >
        </p>
      </el-main>
      <!-- 数据部分 -->
      <el-main class="community" :class="[light ? 'blockLight' : 'blockDark']">
        <p class="BlockTitle">
          <a
            href="#"
            :class="[light ? 'blockLinkLight' : 'blockLinkDark']"
            class="transition"
            >社区分析</a
          >
        </p>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import user from "@/store/user";
import headerhb from "@/components/HeadVue.vue";
export default {
  data() {
    return {
      completeTags: [
        {
          TAG: "vue",
        },
        {
          TAG: "html",
        },
        {
          TAG: "javascript",
        },
        {
          TAG: "python",
        },
        {
          TAG: "Djiango",
        },
      ],
      tagsshow: false,
      logoLight: "<img src='../pic/logo_dark.png' class=\"logo\" />",
      logoDark: "<img src='../pic/logoYellow.png' class=\"logo\" />",
      light: true,
      dark: false,
      webLogoLight: "../pic/StarMapBlackSmall.png",
      webLogoDark: "../pic/StarMapWhiteSmall.png",
      webName: "StarMap",
      message: "",
      tag: "",
      photo: "<img src='../pic/photo.bmp' class=\"avatarPic\" />",
      TitleOne: "",
      TitleTwo: "",
      TitleThree: "",
      article1: "",
      article2: "",
      article3: "",
      PersonOne: "",
      PersonTwo: "",
      PersonThree: "",
      PersonFour: "",
      PersonFive: "",
      AvatarOne: "",
      AvatarTwo: "",
      AvatarThree: "",
      AvatarFour: "",
      AvatarFive: "",
    };
  },
  methods: {
    inputTag(key) {
      let cut = this.tag.split(";");
      let now = "";
      for (let i = 0; i < cut.length - 1; i++) {
        now = now + cut[i] + ";";
      }
      now = now + key["TAG"] + ";";
      console.log(now);
      this.tag = now;
    },
    changeDark: function () {
      this.light = !this.light;
      this.dark = !this.dark;
      var that = this;

      this.$axios.get("/index/").then(
        function (response) {
          console.log(response);
          that.TitleOne = response.data.rank_articles[0].title;
          that.TitleTwo = response.data.rank_articles[1].title;
          that.TitleThree = response.data.rank_articles[2].title;
          that.PersonOne = response.data.rank_followers[0].NAME;
          that.PersonTwo = response.data.rank_followers[1].NAME;
          that.PersonThree = response.data.rank_followers[2].NAME;
          that.PersonFour = response.data.rank_followers[3].NAME;
          that.PersonFive = response.data.rank_followers[4].NAME;
          that.AvatarOne = response.data.rank_followers[0].AVATAR_URL;
          that.AvatarTwo = response.data.rank_followers[1].AVATAR_URL;
          that.AvatarThree = response.data.rank_followers[2].AVATAR_URL;
          that.AvatarFour = response.data.rank_followers[3].AVATAR_URL;
          that.AvatarFive = response.data.rank_followers[4].AVATAR_URL;
        },
        function (err) {
          console.log(err);
        }
      );
    },
    changeLight: function () {
      this.light = !this.light;
      this.dark = !this.dark;
      var thebody = document.getElementsByTagName("body");
      thebody[0].id = "lightTheme";

      var that = this;
      this.$axios.get("/index/").then(
        function (response) {
          console.log(response);
          that.TitleOne = response.data.rank_articles[0].title;
          that.TitleTwo = response.data.rank_articles[1].title;
          that.TitleThree = response.data.rank_articles[2].title;
          that.PersonOne = response.data.rank_commits[0].NAME;
          that.PersonTwo = response.data.rank_commits[1].NAME;
          that.PersonThree = response.data.rank_commits[2].NAME;
          that.PersonFour = response.data.rank_commits[3].NAME;
          that.PersonFive = response.data.rank_commits[4].NAME;
          that.AvatarOne = response.data.rank_commits[0].AVATAR_URL;
          that.AvatarTwo = response.data.rank_commits[1].AVATAR_URL;
          that.AvatarThree = response.data.rank_commits[2].AVATAR_URL;
          that.AvatarFour = response.data.rank_commits[3].AVATAR_URL;
          that.AvatarFive = response.data.rank_commits[4].AVATAR_URL;
        },
        function (err) {
          console.log(err);
        }
      );
    },
    SendMessage: function () {
      var that = this;
      let uid = user.getters.getUser(user.state()).user.uid;
      console.log(uid);
      //let tags = that.message.split(" ");
      this.$axios
        .post("/index/", {
          op: 0, //	# 第几类搜索					0-第一类  1-第二类
          content: that.message,
        })
        .then((res) => {
          console.log(res);
          that.$store.dispatch("saveUserInfo", {
            user: {
              uid: uid,
              search: res.data.allMemberList,
            },
          });
          that.$router.push("/customer");
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$axios
      //   .post("http://101.42.224.73:8000/index", { message: that.message }) //网页不知道 要传递参数叫什么不知道
      //   .then(
      //     function (res) {
      //       console.log(res);
      //       this.$store.dispatch('saveUserInfo', {
      //         user: {
      //           'uid': uid,
      //           'search': res.data,
      //         }
      //       });
      //     },
      //     function (err) {
      //       console.log(err);
      //     }
      //   );
    },
    SendTag: function () {
      var that = this;
      let uid = user.getters.getUser(user.state()).user.uid;
      let alltags = this.tag.split(";");
      console.log("alltags:" + alltags);
      console.log(uid);
      this.$axios
        .post("/index/", {
          op: 1, //	# 第几类搜索					0-第一类  1-第二类
          isSearch: 1, //		# 是添加标签还是搜索用户		0-添加标签	1-搜索成员
          isAnd: 1, //	# 是或还是和					0-或		1-和
          tag: "", //	# 在添加标签的环节中(isSearch==0)	是用户输入的模糊标签
          allTagList: alltags, //# 在搜索成员的环节中(isSearch==1)	是用户填入的所有标签
        }) //网页不知道 要传递参数叫什么不知道
        .then(
          function (res) {
            console.log(res.data);
            that.$store.dispatch("saveUserInfo", {
              user: {
                uid: uid,
                search: res.data.allMemberList,
              },
            });
            that.$router.push("/customer");
          },
          function (err) {
            console.log(err);
          }
        );
    },
    ShowTag: function () {
      var that = this;
      let temp = this.tag.split(";");
      console.log(temp);

      let singleTag = temp[temp.length - 1];
      console.log(singleTag);
      this.$axios
        .post("/index/", {
          op: 1, //	# 第几类搜索					0-第一类  1-第二类
          isSearch: 0, //	# 是添加标签还是搜索用户		0-添加标签	1-搜索成员
          isAnd: 1, //	# 是或还是和					0-或		1-和
          tag: singleTag, //	# 在添加标签的环节中(isSearch==0)	是用户输入的模糊标签
          allTagList: "",
        }) //网页不知道 要传递参数叫什么不知道
        .then(
          function (res) {
            console.log(res);
            that.completeTags = res.data.allTagList;
            console.log(that.completeTags);
          },
          function (err) {
            console.log(err);
          }
        );
      this.tagsshow = !this.tagsshow;
    },
  },
  created() {
    var that = this;
    this.$axios.get("/index/").then(
      function (response) {
        console.log(response);
        that.TitleOne = response.data.rank_articles[0].title;
        that.TitleTwo = response.data.rank_articles[1].title;
        that.TitleThree = response.data.rank_articles[2].title;
        that.article1 = "/forum/" + response.data.rank_articles[0].article_id;
        that.article2 = "/forum/" + response.data.rank_articles[1].article_id;
        that.article3 = "/forum/" + response.data.rank_articles[2].article_id;
        console.log(that.article1);
        console.log("11");
        that.PersonOne = response.data.rank_commits[0].NAME;
        that.PersonTwo = response.data.rank_commits[1].NAME;
        that.PersonThree = response.data.rank_commits[2].NAME;
        that.PersonFour = response.data.rank_commits[3].NAME;
        that.PersonFive = response.data.rank_commits[4].NAME;
        that.AvatarOne = response.data.rank_commits[0].AVATAR_URL;
        console.log(that.AvatarOne);
        that.AvatarTwo = response.data.rank_commits[1].AVATAR_URL;
        that.AvatarThree = response.data.rank_commits[2].AVATAR_URL;
        that.AvatarFour = response.data.rank_commits[3].AVATAR_URL;
        that.AvatarFive = response.data.rank_commits[4].AVATAR_URL;
      },
      function (err) {
        console.log(err);
      }
    );
  },
  components: { headerhb },
};
</script>
<style scoped>
/* 字体声明 */
@font-face {
  font-family: "icomoon";
  src: url("../fonts/icomoon.eot?7kkyc2");
  src: url("../fonts/icomoon.eot?7kkyc2#iefix") format("embedded-opentype"),
    url("../fonts/icomoon.ttf?7kkyc2") format("truetype"),
    url("../fonts/icomoon.woff?7kkyc2") format("woff"),
    url("../fonts/icomoon.svg?7kkyc2") format("svg");
  font-weight: normal;
  font-style: normal;
}
/*给下拉表设置位置 */
.expand_for_tags {
  position: absolute;
  left: calc(50% - 262px);
  top: 150px;
  width: 520px;
  border-radius: 10px;
  background-color:  rgb(103, 222, 255,0.5) ;
  z-index: 2;
}
.EachTag {
  margin-left: 0.5vw;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  margin-right: 0.5vw;
  padding-left: 0.3vw;
  padding-right: 0.3vw;
  float: left;
}
.icomoon {
  font-family: icomoon;
}
.outline {
  outline: none;
}

/* 改主题
改背景颜色 over
改边框颜色:\
1.导航栏字体颜色 over
2.搜索栏背景颜色和字体颜色 over
3.三个板块边框颜色 over
4.阴影颜色
5.小按钮颜色 over
6.三个板块内部颜色
改logo logo要重画 */
#lightTheme {
  background-color: #fafafa;
}

#darkTheme {
  background-color: #010409;
}

.StarBackground1 {
  position: absolute;
  top: 320px;
  left: 260px;
  background-color: transparent;
  height: 400px;
}
.StarBackground2 {
  position: absolute;
  top: 70px;
  left: 950px;
  background-color: transparent;
  height: 400px;
}
.StarBackground3 {
  opacity: 0.8;
  position: absolute;
  left: 70px;
  top: -70px;
  width: 1460px;
}

.change {
  position: absolute;
  left: calc(50% - 325px);
  top: 112px;
  width: 70px;
  height: 37px;
  font-size: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.logo {
  background-color: transparent;
  width: auto;
  height: 37px;
}

.SearchInput >>> .inputLight {
  position: absolute;
  left: calc(50% - 263px);
  top: 112px;
  width: 475px;
  height: 47px;
  /* background-color: #fbfbfb;
  font-size: 15px;
  border: 1px solid rgb(197, 197, 197);
  text-indent: 1em;
  box-shadow: 2px 2px 50px 2px rgb(228, 228, 228); */
}
.SearchInput >>> .inputLight:focus,
.SearchInput >>> .inputLight:active {
  border-color: #f7bf07;
}
.inputDark {
  position: absolute;
  left: calc(50% - 263px);
  top: 112px;
  width: 475px;
  height: 47px;
  /* background-color: #292c30;
  font-size: 15px;
  border: 1px solid #7a828e;
  border-radius: 5px 0 0 5px;
  text-indent: 1em;
  color: #c2c2c3;
  box-shadow: 2px 2px 50px 2px rgb(32, 32, 32); */
}
/* .inputDark:hover,
.inputDark:focus {
  background-color: #272b33;
  border: 1px solid #f7bf07;
  color: #f0f3f6;
} */

.TagButton {
  position: absolute;
  left: calc(50% + 186px);
  top: 119px;
  font-size: 23px;
  color: #67deff;
  border: none;
  background-color: transparent;
}

.searchLight {
  position: absolute;
  left: calc(50% + 214px);
  top: 111px;
  width: 44px;
  height: 41px;
  background-color: #67deff;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 2px 2px 50px 2px rgb(228, 228, 228);
}
.searchDark {
  position: absolute;
  left: calc(50% + 214px);
  top: 111px;
  width: 44px;
  height: 41px;
  background-color: #f7bf07;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 2px 2px 50px 2px rgb(228, 228, 228);
}

.blockLight {
  position: absolute;
  left: calc(50% - 520px);
  height: 130px;
  width: 1040px;
  border: 1px solid #f7e709;
  background-color: rgba(254, 248, 239, 0.81);
  opacity: 0.8;
  border-radius: 10px;
  /* box-shadow: 2px 2px 50px 2px rgb(228, 228, 228); */
}
.blockLight:hover {
  color: #67deff;
}
.blockDark {
  position: absolute;
  left: calc(50% - 520px);
  height: 130px;
  width: 1040px;
  border: 1px solid #61ddfc;
  border-radius: 5px;
  background-color: rgba(239, 251, 254, 0.81);
  opacity: 0.8;
  color: #fff5f9;
  /* box-shadow: 2px 2px 50px 2px rgb(32, 32, 32); */
}
.blockDark:hover {
  color: #f7bf07;
}

.blockLinkLight:hover {
  color: #67deff;
}
.blockLinkDark:hover {
  color: #f7bf07;
}

.leaderboard {
  top: 210px;
}

.forum {
  top: 380px;
  z-index: 0;
}

.BlockTitle {
  position: relative;
  top: 5px;
  text-align: center;
  font-family: "FZShuTi";
  font-size: 27px;
}
.BlockTitle:hover {
  cursor: pointer;
}

.ForumText {
  font-family: "STSong";
  font-size: 17px;
  text-indent: 1em;
  width: 300px;
  top: 50px;
}

.ForumOne {
  position: absolute;
  left: 60px;
}

.ForumTwo {
  position: absolute;
  left: 360px;
}

.ForumThree {
  position: absolute;
  left: 660px;
}

.RankText {
  font-family: "STSong";
  font-size: 17px;
  text-indent: 1em;
}

.RankOne {
  position: absolute;
  top: 45px;
  left: 60px;
}

.RankTwo {
  position: absolute;
  top: 45px;
  left: 260px;
}

.RankThree {
  position: absolute;
  top: 45px;
  left: 460px;
}

.RankFour {
  position: absolute;
  top: 45px;
  left: 660px;
}

.RankFive {
  position: absolute;
  top: 45px;
  left: 860px;
}

.LittleAvatarLight {
  display: inline-block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #67deff;
}
.LittleAvatarDark {
  display: inline-block;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #f7bf07;
}

.FireAndNumLight {
  color: #67deff;
}
.FireAndNumDark {
  color: #f7bf07;
}

.community {
  top: 550px;
}

.navLight {
  position: absolute;
  top: 0;
  left: 0;
  height: 45px;
  width: 100%;
  background-color: white;
  box-shadow: 2px 2px 50px 2px rgb(228, 228, 228);
}
.navDark {
  position: absolute;
  top: 0;
  left: 0;
  height: 45px;
  width: 100%;
  background-color: #272b33;
  box-shadow: 2px 2px 50px 2px rgb(32, 32, 32);
}

.boxLight {
  box-shadow: none;
  display: inline;
  height: 100%;
  width: 112.5px;
  background-color: white;
}
.boxDark {
  box-shadow: none;
  display: inline;
  height: 100%;
  width: 112.5px;
  background-color: #272b33;
}

.StarMap {
  position: relative;
  top: -12px;
  left: 0px;
  height: 80px;
  background-repeat: repeat;
}

.l1 {
  position: absolute;
  top: 0;
  left: 10px;
}

.l2 {
  position: absolute;
  top: 0;
  left: 190px;
}

.l3 {
  position: absolute;
  top: 0;
  left: 260px;
}

.l4 {
  position: absolute;
  top: 0;
  left: 360px;
}

.r1 {
  position: absolute;
  top: 0;
  right: 10px;
}

.r2 {
  position: absolute;
  top: 0;
  right: 80px;
}

.r3 {
  position: absolute;
  top: 0;
  right: 150px;
}

.avatar {
  /* 要改成图片 */
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: transparent;
}

.avatarPic {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.LittleBoxLight {
  text-align: center;
  text-decoration: none;
  line-height: 300%;
  font-size: 15px;
  color: black;
}
.LittleBoxLight:hover {
  color: #67deff;
}
.LittleBoxDark {
  text-decoration: none;
  text-align: center;
  line-height: 300%;
  font-size: 15px;
  color: #fff5f9;
}
.LittleBoxDark:hover {
  color: #f7bf07;
}

.transition {
  text-decoration: none;
  transition: all 0.8s;
}

html {
  font-size: 14.4px; /*默认以设计稿为基准*/
}

/* 内外边距清零 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* em和i斜体清除 */
em,
i {
  font-style: normal;
}
/* 去掉li的小圆点 */
li {
  list-style: none;
}
img {
  /* 照顾低版本浏览器 如果图片外边包含了链接 会有边框的问题 */
  border: 0;
  /* 取消图片底侧有空白缝隙的问题 */
  vertical-align: middle;
}

button {
  /* 当鼠标经过button按钮时 鼠标变成小手 */
  cursor: pointer;
}

a {
  color: #666;
  text-decoration: none;
}

a:hover {
  color: #67deff;
}

button,
input {
  font-family: Microsoft Yahei, Heiti SC, arial, Hiragino Sans GB, "\5B8B\4F53",
    sans-serif;
  color: #666;
}

body {
  /* 抗锯齿 让文字更加清晰 */
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    "\5B8B\4F53", sans-serif;
  color: #666;
}

.hide,
.none {
  display: none;
}
/* 清除浮动 */
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}

.clearfix {
  *zoom: 1;
}
</style>