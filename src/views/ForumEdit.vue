<template>
  <div class="m-container">
    <headerhb />
    <div class="m-content">
      <el-form
        ref="editForm"
        status-icon
        :model="editForm"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item prop="title">
          <span class="Text00">*</span>
          <span v-label="标题" class="Text0">标题</span>
          <el-input
            v-model="editForm.title"
            class="Opacity TextBorder"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item> -->
        <el-form-item prop="content">
          <span class="Text" v-label="内容">内容</span>
          <mavon-editor v-model="editForm.content" class="Meditor Opacity" />
        </el-form-item>
        <el-form-item>
          <el-button class="footbtn1" @click="submitForm()">{{
            sendorchange
          }}</el-button>
          <el-button class="footbtn2" @click="backtoForumAll()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import user from "@/store/user";
import headerhb from "@/components/HeadVue.vue";
//import Header from "@/components/Header";
export default {
  name: "ForumEdit",
  //components: {Header},
  data() {
    return {
      editForm: {
        id: null, /////
        title: "",
        description: "",
        content: "",
      },
      sendorchange: "创建",
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 70,
            message: "长度在 3 到 70 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    const articleId = this.$route.params.articleId;
    const _this = this;
    console.log("准备修改文章");
    if (articleId) {
      this.$axios.get("http://www.zhoues.com/forum/show/" + articleId).then((res) => {
        console.log(res);
        /////////////xiegang
        const article = res.data.article;
        _this.editForm.id = article.id;
        _this.editForm.title = article.title;
        //_this.editForm.description = article.description
        _this.editForm.content = article.content;
        _this.sendorchange = "修改";
      });
    }
  },
  methods: {
    submitForm() {
      const _this = this;
      const articleId = _this.$route.params.articleTd;
      const uid = user.getters.getUser(user.state()).user.uid;
      console.log("用户序号为：" + uid);
      //单纯发表文章
      if (!articleId) {
        console.log(uid);
        console.log(_this.editForm.title);
        console.log(_this.editForm.content);
        _this.$refs.editForm.validate((valid) => {
          if (valid) {
            _this
              .$axios({
                method: "post",
                url: "http://www.zhoues.com/forum/add/",
                data: {
                  uid: uid,
                  title: _this.editForm.title,
                  //"description": this.editForm.description,
                  content: _this.editForm.content,
                },
              })
              .then((res) => {
                console.log("新增帖子请求返回：", res);
                if (res.data.result == 1) {
                  _this.$message.success(res.data.message);
                  _this.$router.push("/forum");
                } else {
                  _this.$message.error(res.data.message);
                }
              });
            return;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        _this
          .$axios({
            methods: "post",
            url: "http://www.zhoues.com/forum/update/" + articleId,
            data: {
              title: _this.editForm.title,
              //"description": this.editForm.description,
              content: _this.editForm.content,
            },
          })
          .then((res) => {
            console.log("修改的结果为" + res);
            if (res.data.result == 1) {
              _this.$message.success(res.data.message);
            } else {
              _this.$message.error(res.data.message);
            }
          });
      }
    },
    backtoForumAll() {
      this.$router.push("/forum");
    },
  },
  components: { headerhb },
};
</script>

<style scoped>
.Opacity {
  opacity: 0.7;
}
.TextBorder {
  border: none;
}

.TextBorder:hover,
.TextBorder:focus {
  border: 1px, solid, #31d3fe;
}

.Text00 {
  text-align: left;
  position: absolute;
  left: -7vh;
  font-size: 2.5vh;
  color: rgb(255, 74, 74);
  opacity: 0.9;
}
.Text0 {
  text-align: left;
  position: absolute;
  left: -6vh;
  font-size: 2.5vh;
  color: rgb(134, 134, 134);
}
.Text {
  text-align: left;
  position: absolute;
  left: -6vh;
  top: 4vh;
  font-size: 2.5vh;
  color: rgb(134, 134, 134);
}

.m-container {
  padding-top: 7vh;
  padding-left: 2vw;
}
/* .el-form-item.el-form-item--feedback{
    
  } */
::v-deep .el-form-item_content {
  margin: 0px 90px 0px 90px;
}
.m-content {
  text-align: center;
  padding-top: 4vh;
  width: 90vw;
  height: 80vh;
}
.Meditor {
  margin-top: 4vh;
  height: 60vh;
}
.footbtn1 {
  height: 3vw;
  width: 5.5vw;
  font-size: 20px;
  background-color: none;
  margin-left: 1vw;
  margin-right: 3vw;
  background-color: rgba(244, 244, 244, 0.9);
  color: #ffd12b;
  border: solid 1px rgba(230, 230, 230, 0.9);
  opacity: 0.9;
  box-sizing: border-box;
  border-radius: 2vh;
}
.footbtn2 {
  height: 3vw;
  width: 5.5vw;
  font-size: 20px;
  background-color: none;
  margin-left: 14vw;
  margin-right: 3vw;
  background-color: rgba(244, 244, 244, 0.9);
  color: #ffd12b;
  border: solid 1px rgba(230, 230, 230, 0.9);
  opacity: 0.9;
  box-sizing: border-box;
  border-radius: 2vh;
}
</style>
