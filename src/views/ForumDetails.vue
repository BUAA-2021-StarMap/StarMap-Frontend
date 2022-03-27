<template>
  <div class="m-container">
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
    <!-- <Header></Header> -->
    <headerhb class="maphighhead" />
    <!-- 选择显示框 -->
    <!-- 确定和取消 -->
    <div class="maphigh1" v-if="showmodel">
      <div class="alertmessage" v-if="showmodel">
        <h4 class="alerttitle">{{ alertmessage }}</h4>
        <div class="alertfoot">
          <el-button class="confirm" @click="deleteconfirm">确定</el-button>
          <el-button class="goback" @click="deletecancel(1)">取消</el-button>
        </div>
      </div>
    </div>
    <div class="maphigh2" v-if="showres">
      <!-- 回复栏 -->
      <div class="replymessage" v-if="showres">
        <el-input
          class="Replycontent"
          placeholder="输入要回复的内容..."
          type="textarea"
          rows="4"
          v-model="replycontent"
          clearable
          max-length="1000"
        ></el-input>
        <el-button class="res-sub-btn" @click="ressubcomment()">提交</el-button>
        <el-button class="res-sub-btn" @click="deletecancel(2)">取消</el-button>
      </div>
    </div>
    <div class="maplow">
      <!-- 帖子的具体内容 -->
      <div class="mblog">
        <h2 class="mdtitle" v-html="article.title" style="color: #31d3fe"></h2>
        <v-row>
          <v-spacer />

          <!-- <router-link
          :to="{ name: 'ForumEdit', params: { articleId: article.article_id } }"
        >
          编辑</router-link
        > -->
          <el-button
            v-if="ownArticle"
            class="article-delete-btn"
            @click="updateArticle"
            >编辑</el-button
          >

          <!-- 删除按钮 点击出现弹窗 -->
          <el-button
            v-if="ownArticle"
            class="article-delete-btn"
            @click="deleteArticle"
            >删除</el-button
          >
        </v-row>

        <el-divider></el-divider>
        <v-card class="Mcard">
          <div class="content markdown-body" v-html="article.content"></div>
        </v-card>
      </div>
      <!-- 添加评论 -->
      <v-card class="commentadd">
        <div class="replycontent">
          <el-input
            placeholder="输入评论..."
            type="textarea"
            v-model="commentcontent"
            clearable
            max-length="1000"
          ></el-input>
        </div>
        <div class="reply-btn-box">
          <el-button class="reply-btn" size="medium" @click="sendComment"
            >发表评论</el-button
          >
        </div>
        <!-- <div
        tabindex="0"
        contenteditable="true"
        id="replyInput"
        spellcheck="false"
        placeholder="输入评论..."
        class="reply-input"
        @focus="showReplyBtn"
        @input="onDivInput($event)"
      ></div> -->
      </v-card>
      <!-- 展示所有评论 -->
      <div class="comments">
        <el-timeline>
          <el-timeline-item
            v-bind:timestamp="changetime(com.updated_time)"
            placement="top"
            v-for="com in comments"
            :key="com.comment_id"
          >
            <el-card class="TLcard">
              <!-- <h4>{{ com.username + ":"}}</h4> -->
              <v-row class="TLrow1"
                ><h4 class="cardtitle">{{ judge_father(com) }}</h4></v-row
              >
              <v-row class="TLrow2" rows="3">
                <el-input
                  type="textarea"
                  v-model="com.body"
                  max-length="1000"
                  readonly="true"
                  rows="4"
                ></el-input>
              </v-row>
              <v-row class="TLrow3">
                <v-spacer />
                <el-button
                  class="res-btn"
                  ref="${com.comment_id}"
                  @click="deleteComment(com)"
                  type="primary"
                  v-show="user_now.username == com.username"
                  >删除</el-button
                >
                <el-button
                  class="res-btn"
                  :ref="com.comment_id"
                  @click="rescomment(com)"
                  type="primary"
                  >回复</el-button
                >
                <el-button
                  class="res-btn"
                  :ref="com.comment_id"
                  @click="reviseComment(com)"
                  type="primary"
                  v-show="user_now.username == com.username"
                  >修改</el-button
                >
              </v-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import "github-markdown-css/github-markdown.css"; // 然后添加样式markdown-body
import user from "@/store/user";
import headerhb from "@/components/HeadVue.vue";
//import marked from 'marked';
//import Vue from 'vue';
//import Header from "@/components/Header";
export default {
  name: "ArticleDetail",
  //   components: {
  //     Header,
  //   },r
  data() {
    return {
      //s: "",
      article: {},
      comments: {},
      commentcontent: "",
      replycontent: "",
      alertmessage: "",
      showmodel: false,
      showres: false,
      ownArticle: false,
      user_now: user.getters.getUser(user.state()).user,
      com_now: "",
      deletetype: "",
      restype: "",
    };
  },
  methods: {
    changetime(created_time) {
      let ans = created_time.split(/[T:]/);
      return ans[0] + " " + ans[1] + ":" + ans[2];
    },
    //编辑文章
    updateArticle() {
      this.$router.push({
        name: "ForumEdit",
        params: { articleId: this.article.article_id },
      });
      //:to="{ name: 'ForumEdit', params: { articleId: article.article_id } }"
    },
    //判断@谁
    judge_father(com) {
      if (com.reply_comment_id != 0)
        return com.username + ":@" + com.reply_username;
      else return com.username + ":";
    },
    //初始渲染
    getArticle() {
      const articleId = this.$route.params.articleId;
      const _this = this;
      this.$axios.get("/forum/show/" + articleId).then((res) => {
        console.log(res);
        // console.log(res.data.data)
        _this.article = res.data.article;
        var MarkdownIt = require("markdown-it");
        var md = new MarkdownIt();
        var result = md.render(_this.article.content);
        _this.article.content = result; //marked(_this.article.content);
        _this.comments = res.data.comment;

        _this.ownArticle = _this.article.user_id == _this.user_now.uid;
      });
    },
    //发送评论
    sendComment() {
      let user_now = user.getters.getUser(user.state()).user.uid;
      console.log(user_now);
      if (!this.commentcontent) {
        this.$alert("输入评论不能为空！");
        return;
      } else {
        const articleId = this.$route.params.articleId;
        this.$axios({
          method: "post",
          url: "/forum/show/" + articleId + "/",
          data: {
            uid: this.user_now.uid,
            body: this.commentcontent,
            status: 1,
            comment_id: "",
            reply_comment_id: 0,
            reply_username: "",
          },
        })
          .then((res) => {
            if (res.data.result == 1) {
              this.$message.success("发表成功！");
              console.log(res);
              this.commentcontent = ""; //评论框清空 重新渲染产生的评论
              this.comments = res.data.comment; ////重新渲染？？
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err); /* 若出现异常则在终端输出相关信息 */
          });
      }
    },
    //修改评论
    reviseComment(com) {
      this.com_now = com;
      this.restype = 2;
      this.replycontent = com.body;
      this.showres = true;
    },
    //点击删除评论按钮
    deleteComment(com) {
      this.com_now = com;
      this.alertmessage = "确定要删除这条评论吗？";
      this.deletetype = 2;
      this.showmodel = true;
    },
    //点击删除文章按钮
    deleteArticle() {
      this.deletetype = 1;
      this.alertmessage = "确定要删除这篇文章吗？";
      this.showmodel = true;
    },
    //确定删除文章
    deleteconfirm() {
      const articleId = this.$route.params.articleId;
      //const user_now = user.getters.getUser(user.state()).uid;
      if (this.deletetype == 1) {
        this.$axios({
          method: "post",
          url: "/forum/delete/" + articleId + "/",
          data: {
            uid: this.user_now.uid,
          },
        }).then((res) => {
          console.log(res);
        });

        //////////注意全局变量的定义
        this.deletetype = "";
        this.$router.push("/forum");
      } else if (this.deletetype == 2) {
        this.$axios({
          method: "post",
          url: "/forum/show/" + articleId + "/",
          data: {
            uid: this.user_now.uid,
            body: this.com_now.body,
            status: 3,
            comment_id: this.com_now.comment_id,
          },
        }).then((res) => {
          console.log(res);
          console.log("现在的评论为" + res.data.comment);
          this.comments = res.data.comment;
        });
        this.showmodel = false;
        this.deletetype = "";
        this.com_now = "";
      }
    },
    // 1=>取消删除文章 2=>取消回复评论
    deletecancel(type) {
      if (type == 1) this.showmodel = false;
      if (type == 2) {
        this.showres = false;
        this.replycontent = "";
        this.com_now = "";
      } //这里注意是没有清空回复框的 现在有了
    },
    //点击回复按钮
    rescomment(com) {
      this.com_now = com;
      this.restype = 1;
      this.showres = true;
      // //re_show=true;
      // this.$refs[`${num}`]= true;
      // console.log(this.$refs[`13`]);
    },
    //点击回复按钮之后的提交按钮 或者点击修改之后的提交按钮 //一个窗口三个用处 可以用于发表评论 回复评论 修改评论
    ressubcomment() {
      // let user_now = user.getters.getUser(user.state()).user;
      console.log(this.user_now);
      console.log("回复或修改之后的内容为" + this.replycontent);
      if (!this.replycontent) {
        this.$alert("输入评论不能为空！");
        return;
      } else {
        ////为1是回复评论 为2是修改评论
        const articleId = this.$route.params.articleId;
        if (this.restype == 1) {
          this.$axios({
            method: "post",
            url: "/forum/show/" + articleId + "/",
            data: {
              uid: this.user_now.uid,
              body: this.replycontent,
              status: 1,
              comment_id: "",
              reply_comment_id: this.com_now.comment_id,
              reply_username: this.com_now.username,
            },
          })
            .then((res) => {
              if (res.data.result == 1) {
                this.$message.success("发表成功！");
                console.log(res);
                this.com_now = "";
                this.replycontent = ""; //评论框清空 重新渲染产生的评论
                this.comments = res.data.comment; ////重新渲染？？
                this.showres = false;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err); /* 若出现异常则在终端输出相关信息 */
            });
        } else if (this.restype == 2) {
          this.$axios({
            method: "post",
            url: "/forum/show/" + articleId + "/",
            data: {
              uid: this.user_now.uid,
              body: this.replycontent,
              status: 2,
              comment_id: this.com_now.comment_id,
            },
          })
            .then((res) => {
              if (res.data.result == 1) {
                this.$message.success("发表成功！");
                console.log(res);
                this.com_now = "";
                this.replycontent = ""; //评论框清空 重新渲染产生的评论
                this.comments = res.data.comment; ////重新渲染？？
                this.showres = false;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err); /* 若出现异常则在终端输出相关信息 */
            });
        }
      }
    },
  },
  created() {
    this.getArticle();
  },
  components: { headerhb },
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
}
.StarBackground2 {
  position: absolute;
  top: 70px;
  left: 950px;
  background-color: transparent;
  height: 400px;
  z-index: -1;
}
.StarBackground3 {
  opacity: 0.8;
  position: absolute;
  left: 70px;
  top: -70px;
  width: 1460px;
  z-index: -1;
}

.maphigh1 {
  border-radius: 10px;
  border: rgba(254, 248, 239, 0.81) 1px solid;
  background-color: rgba(255, 255, 255, 0.92);
  position: fixed;
  top: 25vh;
  left: 30vw;
  width: calc(100% - 60vw);
  height: 20vh;
  z-index: 2;
  padding: 3vh 5vw 3vh 5vw;
}
.maphigh2 {
  border-radius: 10px;
  border: rgba(254, 248, 239, 0.81) 1px solid;
  background-color: rgba(255, 255, 255, 0.92);
  position: fixed;
  top: 25vh;
  left: 30vw;
  width: calc(100% - 60vw);
  height: 30vh;
  z-index: 2;
  padding: 5vh 5vw 5vh 5vw;
}
.replymessage {
  text-align: center;
  border-color: azure;
}
/*弹窗回复框 */
.Replycontent {
  position: inherit;
  height: 80%;
  margin-bottom: 5vh;
}
/*弹窗回复按钮 */
.res-sub-btn {
  background-color: #67deff;
}
/*确定删除？字样 */
.alerttitle {
  margin-bottom: 5vh;
}
.confirm {
  background-color: #67deff;
}
.goback {
  background-color: #67deff;
}
.article-delete-btn {
  margin-right: 0vw;
  border: unset;
  color: #67deff;
}
.maplow {
  z-index: 1;
  margin-top: 6vh;
}
.maphighhead {
  z-index: 1;
}
/*文本加标题*/
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 4vh;
  padding-left: 3vw;
  padding-right: 3vw;
}
/*md文档所在的卡片 */
.Mcard {
  margin-top: 2vh;
  margin-bottom: 0vh;
  margin-left: 1vw;
  margin-right: 1vw;
  padding-left: 3vw;
  padding-right: 3vw;
  min-height: 40vh;
  background-color: rgba(254, 248, 239, 0.81);
}
.mdtitle {
  color: #67deff;
  font-family: STXinwei;
  font-size: xx-large;
}
/*md文档 */
.content.markdown-body {
  text-align: left;
  background-color: rgba(254, 248, 239, 0.81);
}
/*评论 */
.commentadd {
  background-color: rgba(254, 248, 239, 0.81);
  margin-bottom: 2vh;
  margin-left: 4vw;
  margin-right: 4vw;
  margin-top: 2vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 3vw;
  padding-right: 3vw;
}
/* .replycontent {
  
} */
/*回复按钮 */
.reply-btn-box {
  margin-top: 2vh;
  text-align: right;
}
.reply-btn {
  background-color: #67deff;
  color: white;
}
/*评论们 */
/*时间卡片宽度 */
.el-timeline {
  margin-left: 15vw;
  margin-right: 15vw;
}
::v-deep .el-timeline-item__timestamp.is-top {
  display: inline-block;
  width: 100%;
  text-align: left;
  color: #ddb619;
}
.TLcard {
  min-height: 25vh;
  background-color: rgba(254, 248, 239, 0.81);
}
/*名字 */
.TLrow1 {
  height: 6vh;
  color: #67deff;
  font-size: x-large;
  font-weight: bold;
  font-style: italic;
  padding-left: 0vw;
}
/*评论内容 */
.TLrow2 {
  height: 13vh;
  padding-left: 1vw;
  padding-right: 1vw;
}
/*三个按钮 */
.TLrow3 {
  height: 5vh;
  text-align: right;
}
/*滚动条 */
.res-btn {
  color: #67deff;
  border: none;
  background-color: unset;
}

.cardtitle {
  font-family: STXinwei;
}
</style>
