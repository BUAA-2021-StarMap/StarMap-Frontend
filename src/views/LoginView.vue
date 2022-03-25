<template>
  <div id="login" class="login">
    <img src="../pic/logo_starmap.png" title="StarMap" class="StarMap" />
    <img src="../pic/star/StarBackground1.png" alt="" class="StarBackground1" />
    <img src="../pic/star/StarBackground2.png" alt="" class="StarBackground2" />
    <img src="../pic/star/StarBackground3.png" alt="" class="StarBackground3" />
    <h1 class="logintitle">登录</h1>
    <div class="wrap">
      <el-form :model="form" ref="form" class="form">
        <!-- <p class="input_title">Username</p> -->
        <el-form-item prop="username">
          <el-input
            placeholder="用户姓名"
            type="username"
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <p class="input_title">Password</p> -->
        <el-form-item id="password" prop="password">
          <el-input
            placeholder="密码"
            show-password
            type="password"
            v-model="form.password"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn_login">
          <el-button type="primary" @click="login">登&nbsp;录</el-button>
        </el-form-item>
      </el-form>
      <div class="suffix">
        <!-- <p @click="toRegister">注册帐号</p> -->
        <router-link to="/register" tag="button" class="register outline"
          >注册</router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
//import qs from "qs";
export default {
  name: "NewLogin",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login: function () {
      // 检查表单是否有填写内容
      if (this.form.username === "" || this.form.password === "") {
        this.$message.warning("请输入用户名和密码！");
        return;
      }
      console.log("sendpost");
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "https://www.zhoues.com/user/login/",
        //url: '/admin/resource/',      /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: {
          /* 需要向后端传输的数据，*/ username: this.form.username,
          password: this.form.password,
        },
      })
        .then((res) => {
          console.log(res); /* res 是 response 的缩写 */
          switch (res.data.result) {
            case 1:
              this.$message.success("登录成功！");
              /* 将后端返回的 user 信息使用 vuex 存储起来 */
              this.$store.dispatch("saveUserInfo", {
                user: {
                  username: this.form.username,
                  uid: res.data.uid,
                },
              });

              /* 从 localStorage 中读取 preRoute 键对应的值 */
              var history_pth = localStorage.getItem("preRoute");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  console.log("跳转至主页");
                  this.$router.push("/main");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
              break;
            case 0:
              this.$message.error(res.data.message);
              break;
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
    toRegister: function () {
      // 跳转注册的路由
      // this.$router.push('/login/regeister');
      console.log(this.$router);
    },
  },
  mounted() {
    console.log("123456");
  },
};
</script>

<style scoped>
.logintitle {
  font-size: 29px;
  font-family: "FZShuTi";
}
.outline {
  outline: none;
}

.register {
  color: black;
}

.register:hover {
  color: #0084ff;
}

.StarMap {
  z-index: -1;
  background-color: transparent;
  width: 30vw;
  top: 0vh;
}
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
h1 {
  margin-top: 3vh;
  color: #000000b8;
  font-size: 24px;
  font-family: "Helvetica Neue";
}
#login {
  font-family: "Noto Serif SC", serif;
}
#login >>> .el-input__inner {
  font-family: "Noto Serif SC", serif;
}
#login >>> .el-input__inner:hover,
#login >>> .el-input__inner:focus {
  border: 1px solid #31d3fe;
}
#login .bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform 0.25s, filter 0.25s;
  backface-visibility: hidden;
}
#login .logo {
  cursor: pointer;
  overflow: hidden;
  height: 150px;
}
#login .wrap {
  margin-top: 3vh;
  width: 300px;
  height: 240px;
  padding: 30px 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;

  border-color: black;
  border: 5px;
  background-color: rgba(234, 253, 255, 0.85);
  border-radius: 20px;
}
#login .form {
  padding: px 25px 0 25px;
  position: relative;
}
#login .input_title {
  color: #000000b8;
  font-size: 15px;
  font-family: "Helvetica Neue";
  margin-top: 10px;
  float: left;
}
#login .btn_login {
  color: white;
  margin-top: 25px;
  text-align: center;
}
#login .btn_login button {
  line-height: 10px;
  font-family: "Helvetica Neue";
  /* 'Noto Serif SC', serif */
  background-color: #31d3fe;
  border: none;
  width: 100%;
  height: 38px;
}
#login .suffix {
  font-size: 14px;
  line-height: 10px;
  color: #999;
  cursor: pointer;
  float: right;
}
/* #login .suffix button {
  color: rgb(26, 93, 186);
  font-size: 15px;
  border: none;
  background-color: rgba(245, 250, 250, 0.85);
} */
</style>
