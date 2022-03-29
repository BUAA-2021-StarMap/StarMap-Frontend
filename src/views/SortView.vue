<template>
  <div id="sort-main-page" style="display: flex">
    <!-- <div id='left-side'>
    
    </div> -->
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
    <headhb />
    <div id="main-page">
      <!-- 标题和工具栏 -->
      <div id="title">
        <span>用户列表</span>
        <!-- 排序类型下拉栏 -->
        <el-dropdown
          @command="orderIndex"
          split-button
          class="right"
          size="small"
        >
          {{ orderUser }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">按commits数量正序</el-dropdown-item>
            <el-dropdown-item command="2">按commits数量倒序</el-dropdown-item>
            <el-dropdown-item command="3">按followers数量正序</el-dropdown-item>
            <el-dropdown-item command="4">按followers数量倒序</el-dropdown-item>
            <el-dropdown-item command="5">按issues数量正序</el-dropdown-item>
            <el-dropdown-item command="6">按issues数量倒序</el-dropdown-item>
            <el-dropdown-item command="7"
              >按pullRequests数量正序</el-dropdown-item
            >
            <el-dropdown-item command="8"
              >按pullRequests数量倒序</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 主体部分 -->
      <div v-if="ifHasUser" id="main-body">
        <div id="ranking-area">
          <!-- 每一条帖子的设置 -->
          <div v-for="(msg, index) in userData" class="box-card" :key="index">
            <!-- “更多信息”的弹出框 -->
            <div class="additional">
              <!-- 左半部分展示用户主要信息和头像 -->
              <div class="user-card">
                <div class="level center">ID: {{ msg.ID }}</div>
                <img :src="msg.AVATAR_URL" alt="用户头像" class="center" />
                <div class="points center">{{ msg.STARS_COUNT }} Stars</div>
              </div>
              <!-- 弹出后的右半部分展示用户的信息 -->
              <div class="more-info">
                <h1>{{ msg.NAME }}</h1>
                <div class="coords">
                  <span>Group Name</span>
                  <!-- <span>Joined January 2019</span> -->
                  <span>Joined {{ msg.CREATED_TIME.slice(0, 10) }}</span>
                </div>
                <div class="coords">
                  <span>Position/Role</span>
                  <span>City, Country</span>
                </div>
                <div class="stats">
                  <div>
                    <div class="title">COMMITS</div>
                    <i class="iconfont icon-pinglun"></i>
                    <div class="value">{{ msg.COMMITS_COUNT }}</div>
                  </div>
                  <div>
                    <div class="title">FOLLOWERS</div>
                    <i class="iconfont icon-fensi"></i>
                    <div class="value">{{ msg.FOLLOWERS_COUNT }}</div>
                  </div>
                  <div>
                    <div class="title">ISSUES</div>
                    <i class="iconfont icon-wentijieda"></i>
                    <div class="value">{{ msg.ISSUES_COUNT }}</div>
                  </div>
                  <div>
                    <div class="title">PULLS</div>
                    <i class="iconfont icon-huida"></i>
                    <div class="value">{{ msg.PULLS_COUNT }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="general">
              <h1>{{ msg.NAME }}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a
                volutpat mauris, at molestie lacus. Nam vestibulum sodales odio
                ut pulvinar.
              </p>
              <span class="more">Mouse over the card for more info</span>
            </div>
          </div>
          <!-- 底部页码显示区域 -->
          <div class="my-pagination">
            <el-pagination
              layout="sizes, prev, pager, next, jumper"
              background
              :current-page="currentPage"
              :page-size="pageSize"
              :page-sizes="pageSizes"
              :total="UserList.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 没有查询到符合条件的用户 -->
      <div v-else>
        <el-divider />
        <el-empty :image-size="225" description="未查询到满足条件的用户信息！">
          <!-- <el-button type="primary" @click="linkCreate">创建问卷</el-button> -->
        </el-empty>
      </div>
    </div>
    <!-- main-page页结束 -->
  </div>
</template>

<script>
import headhb from "@/components/HeadVue.vue";
export default {
  name: "SortMainPage",
  // 初始化的刷新请求
  created() {
    this.searchUsers(0);
  },
  data() {
    return {
      // 页数计算相关
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 10, 15],

      proKey: "", // 项目关键词
      input: "", // 输入框的输入

      orderUser: "点右边箭头调整排序标准哦~QAQ",
      orderItem: "default",
      orderType: "default",
      ifHasUser: true,
      UserList: [
        {
          // 这个是默认的占位数据，不要注释掉
          AVATAR_URL:
            "https://portrait.gitee.com/uploads/avatars/user/450/1352340_zhaojh329_1578949560.png",
          COMMITS_COUNT: 0,
          CREATED_TIME: "2020-03-30T14:41:57+08:00",
          FOLLOWERS_COUNT: 223,
          FOLLOWING_COUNT: 17,
          ID: 7387629,
          ISSUES_COUNT: 0,
          LOGIN: "openharmony_ci",
          NAME: "openharmony_ci",
          PULLS_COUNT: 0,
          STARS_COUNT: 0,
          UPDATED_TIME: "2022-03-15T14:21:58+08:00",
          WATCHES_COUNT: 2069,
        },
      ],
    };
  },
  methods: {
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index;
    },
    handleSizeChange(size) {
      console.log(`现在是每页${size} 条`);
      this.currentPage = 1; // 每次调整页数设置，回到第一页
      this.pageSize = size;
    },
    handleCurrentChange(val) {
      console.log(`当前页：${val}`);
      this.currentPage = val;
    },

    // 排序方式（待修改）
    orderIndex(command) {
      switch (command) {
        case "1":
          this.orderUser = "按commits数量正序";
          this.orderItem = "commit_nums"; //commit_nums
          this.orderType = "asc";
          break;
        case "2":
          this.orderUser = "按commits数量倒序";
          this.orderItem = "commit_nums";
          this.orderType = "desc";
          break;
        case "3":
          this.orderUser = "按followers数量正序";
          this.orderItem = "follows_nums"; //follows_nums
          this.orderType = "asc";
          break;
        case "4":
          this.orderUser = "按followers数量倒序";
          this.orderItem = "follows_nums";
          this.orderType = "desc";
          break;
        case "5":
          this.orderUser = "按issues数量正序";
          this.orderItem = "issue_nums"; //issue_nums
          this.orderType = "asc";
          break;
        case "6":
          this.orderUser = "按issues数量倒序";
          this.orderItem = "issue_nums";
          this.orderType = "desc";
          break;
        case "7":
          this.orderUser = "按pullRequests数量正序";
          this.orderItem = "pullRequests_nums"; //pullRequests_nums
          this.orderType = "asc";
          break;
        case "8":
          this.orderUser = "按pullRequests数量倒序";
          this.orderItem = "pullRequests_nums";
          this.orderType = "desc";
          break;
      }
      this.searchUsers(1);
    },

    // 和后端交互
    searchUsers(tag) {
      if (this.orderItem !== "default" && this.orderType !== "default") {
        // elementUI 加载loading实例
        let loadingInstance = this.$loading({
          // target: '#main-page',
          fullscreen: true,
        });

        this.$axios({
          method: "post",
          url: "/ranking/",
          data: {
            order_item: this.orderItem,
            order_type: this.orderType,
          },
        })
          .then((res) => {
            // 关闭加载实例
            loadingInstance.close();
            switch (res.data.result) {
              case 1:
                this.$message.success("加载成功！");
                console.log(res.data.rank_member);
                this.UserList = res.data.rank_member;
                this.ifHasUser = true;
                break;

              default:
                this.$message.warning("加载失败！");
                this.ifHasUser = false;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // 这里主要是初始化的时候不能呈现一个空界面，安排一个默认排序。
      else if (tag === 0) {
        let loadingInstance = this.$loading({
          fullscreen: true,
        });

        this.$axios({
          method: "post",
          url: "/ranking/",
          data: {
            order_item: "follows_nums",
            order_type: "desc",
          },
        })
          .then((res) => {
            // 关闭加载实例
            loadingInstance.close();
            switch (res.data.result) {
              case 1:
                this.$message.success("加载成功！");
                console.log(res.data.rank_member);
                this.UserList = res.data.rank_member;
                this.ifHasUser = true;
                break;

              default:
                this.$message.warning("加载失败！");
                this.ifHasUser = false;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  // 计算属性 切片出当前页面应该呈现的用户的数组
  computed: {
    userData: function () {
      return this.UserList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  components: { headhb },
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

/* 让一个元素在父元素中居中 */
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
}
#sort-main-page {
  width: 100vw;
  padding: 0 3vw;
  box-sizing: border-box;
  /* min-width: 1200px; */
  min-height: 1200px;
  /* background-color: rgb(241, 241, 241); */
}
#main-page {
  /* width: 70%; */ /* 需要加上左半部分时解开注释 */
  width: 94vw;
  /* min-width: 940px; */
  /* background-color: rgb(255, 216, 216) */
}
/* #region --- titile部分 */
#title {
  width: 94vw;
  height: 35px;
  margin: 20px 0;
  margin-bottom: 65px; /* 这里是把加载区域顶下去 */
  /* margin-left: 35px; */
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* overflow: hidden; */
}
#title span {
  display: block;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 6px;
}
.right {
  float: right;
  margin: 10px 15px;
  /* margin-top: 10px; */
  padding: 13px 0;
}
/* #endregion */

#main-body {
  margin: 0 auto;
  /* overflow: hidden; */
  /* min-width: 940px; */
}
/* to 博哥 
  这里是解决子元素和父元素外边距重叠问题加的容器，这里去掉这一层容器#ranking-area也不会太影响，
  但是会造成box-card容器的垂直外边距不在父元素内部生效而是在外部
  如果不记得clearfix咋写，在外面套一层父元素，开启overflow:hidden（本质上是开启元素的BFC）就可以解决
  这里#ranking-area宽度必须写死，否则加载后会抖动
  */
#ranking-area {
  overflow: hidden;
  width: 90%;
  height: auto;
  margin: 0 5%;
}
/* #region --- 用户信息卡片box-card部分 */
.box-card {
  /* margin: 40px 15%; */
  margin: 5.7vh 15%;
  width: 60vw;
  /* height: 200px; */
  height: 27vh;
  font-size: 14px;
  background-color: #fff;
  background: linear-gradient(#f8f8f8, #fff);
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  opacity: 0.75;
}
.box-card h1 {
  /* 这里实际上就是控制子元素 .addtional .general 下的h1 */
  text-align: center;
  font-size: 4vh;
}
/* 显示更多信息的弹出框的样式 */
.box-card .additional {
  position: absolute;
  width: 16vw;
  /* width: 940px; */
  height: 100%;
  /* background: linear-gradient(#dE685E, #EE786E); */
  /* background: linear-gradient(rgb(245, 186, 186), rgb(255, 216, 216)); */
  background: linear-gradient(rgb(108, 196, 199), rgb(166, 213, 221));
  /* background: linear-gradient(rgb(255, 216, 216), rgb(255, 216, 216)); */
  /* 这里是弹出后收回的过渡 */
  transition: width 0.4s;
  overflow: hidden; /*这是隐藏右半部分的关键*/
  z-index: 2;
}
/* 悬停弹出 */
.box-card:hover .additional {
  width: 100%;
  border-radius: 0 5px 5px 0;
}

/* #region 左半部分展示用户主要信息和头像 */
.box-card .additional .user-card {
  /* width: 190px;*/
  width: 16vw; /* 这里和 .additional 没展开之前是一样的*/
  height: 100%;
  position: relative;
  float: left;
}
/* 弹出以后新展示出来的信息和原来的主要信息之间的竖线 */
.box-card .additional .user-card::after {
  content: "";
  display: block;
  position: absolute;
  top: 10%;
  right: -2px;
  height: 80%;
  border-left: 2px solid rgba(0, 0, 0, 0.025);
}
/* 用户头像 */
.box-card img {
  /* width: 100px; */
  /* height: auto; */
  height: 12vh;
  border-radius: 50%;
}
/* level point  */
.box-card .additional .user-card .level,
.box-card .additional .user-card .points {
  top: 15%;
  color: white;
  text-transform: uppercase;
  font-size: 0.75em;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.15);
  padding: 0.125rem 0.75rem;
  border-radius: 100px;
  white-space: nowrap;
}
.box-card .additional .user-card .points {
  top: 85%;
}
/* #endregion */

/* #region 弹出后的右半部分展示用户的信息 */
.box-card .additional .more-info {
  /*width: 750px;*/ /* 这里实际上应该是box-card的宽度减去.user-card宽度 */
  width: 44vw;
  float: left;
  position: absolute;
  left: 16vw;
  height: 100%;
}
.box-card .additional .more-info h1 {
  color: white;
  margin-bottom: 5px;
}

.box-card .additional .coords {
  margin: 0 1rem;
  color: white;
  /* font-size: 1rem; */
  font-size: 2.2vh;
}

.box-card .additional .coords span + span {
  float: right;
}

/* 图标信息部分 */
.box-card .additional .stats {
  font-size: 2rem;
  display: flex;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  top: auto;
  color: white;
}

.box-card .additional .stats > div {
  flex: 1;
  text-align: center;
}

.box-card .additional .stats i {
  display: block;
  /* font-size: 2.1rem; */
  font-size: 5vh;
  margin: 4px 0;
}

.box-card .additional .stats div.title {
  /* font-size: 0.75rem; */
  font-size: 1.8vh;
  font-weight: bold;
  text-transform: uppercase;
}

.box-card .additional .stats div.value {
  /* font-size: 1.5rem; */
  /* line-height: 1.5rem; */
  font-size: 3.5vh;
  line-height: 3.5vh;
  font-weight: bold;
}

/* #endregion 弹出后的右半部分展示用户的信息 */

/* #region 弹出之前白色区域展示的信息  */
.box-card .general {
  width: 44vw;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  box-sizing: border-box;
  padding: 1rem;
  padding-top: 0;
}

.box-card .general p {
  margin: 16px 0;
}

.box-card .general .more {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.9em;
}
/* #endregion*/

/* #endregion*/

.my-pagination {
  position: absolute;
  left: 50%;
  /* bottom:1vh; */
  /* bottom:0; */
  -webkit-transform: translate(-50%, 0);
}
</style>