<template>
  <div id="login" class="login">
    <img src="../pic/logo_starmap.png" title="StarMap" class="StarMap" />
    <img src="../pic/star/StarBackground1.png" alt="" class="StarBackground1" />
    <img src="../pic/star/StarBackground2.png" alt="" class="StarBackground2" />
    <img src="../pic/star/StarBackground3.png" alt="" class="StarBackground3" />
    <div class="login-wrap">
      <h1 class="registertitle">注册</h1>
      <div class="wrap">
        <el-form :model="form" ref="form" class="form">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="form.msg"
              maxlength="6"
              placeholder="请输入验证码"
              class="msgholder"
            ></el-input>
            <el-button
              :loading="codeLoading"
              :disabled="isDisable"
              size="small"
              round
              class="msgbt"
              v-model="form.sendmsg"
              @click="sendMsg"
              >{{ statusMsg }}</el-button
            >
            <span class="counsec">{{ countsec }}</span>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.cpassword"
              show-password
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="btn_login">
            <el-button type="primary" icon @click="doRegister()"
              >注&nbsp;册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <router-view></router-view>>
  </div>
</template>
 
<script>
//import axios from "axios";
//import qs from "qs";
//import Vue from "vue";
//import { nextTick } from "vue";
export default {
  name: "RegisterView",
  data() {
    return {
      statusMsg: "发送验证码",
      isDisable: false,
      codeLoading: false,
      countsec: "",
      csendMsg: 0,
      form: {
        username: "",
        email: "",
        msg: "",
        password: "",
        cpassword: "",
      },
    };
  },
  created() {
    //console.log($);
    console.log("1111");
  },
  //   watch: {
  //     cSendMsg: {
  //       handler() {
  //         console.log("输出变化值",this.csendMsg);
  //         let timerid;
  //         let count = 60;
  //         //this.ruleForm.code = ''
  //         //this.codeLoading = false;
  //         this.isDisable = true;
  //         //this.statusMsg = `${count--}秒`;
  //         this.countsec=`${count--}秒`;
  //         timerid = window.setInterval(function () {
  //          // this.statusMsg = `${count--}秒`;
  //           this.countsec=`${count--}秒`;
  //           console.log(this.countsec);
  //           if (count <= 0) {
  //             this.isDisable = false;
  //             //this.statusMsg = "发送验证码";
  //               this.countsec="";
  //             window.clearInterval(timerid);
  //           }
  //         }, 1000);
  //       },
  //       immediate: false,
  //     },
  //   },
  methods: {
    sendMsg() {
      if (!this.form.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.form.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (this.form.email != null) {
        var reg =
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.form.email)) {
          this.$message.error("请输入有效的邮箱！");
          return;
        } else {
          //this.csendMsg++;
          console.log("点击", this.csendMsg);
          this.$axios({
            method: "post" /* 指明请求方式，可以是 get 或 post */,
            url: "http://101.42.224.73:8000/user/sendEmail/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
            data: {
              email: this.form.email,
            },
          })
            .then((res) => {
              /* res 是 response 的缩写 */
              console.log("输出response", res);
              this.$message.success(res.data.message);
              //this.codeLoading = true;
            })
            .catch((err) => {
              console.log(err); /* 若出现异常则在终端输出相关信息 */
            });
          this.csendMsg = 60;
          this.countdown();
        }
      }
    },
    doRegister() {
      if (!this.form.msg) {
        this.$message.error("请输入验证码！");
        return;
      }
      if (!this.form.password) {
        this.$message.error("请输入密码！");
        return;
      } else if (this.form.password != this.form.cpassword) {
        this.$message.error("两次密码不一致");
      } else {
        // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "http://101.42.224.73:8000/user/register/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: {
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            username: this.form.username,
            password1: this.form.password,
            password2: this.form.cpassword,
            email: this.form.email,
            email_code: this.form.msg,
          },
        })
          .then((res) => {
            console.log("输出response.data", res);
            if (res.data.result == 1) {
              this.$message.success(res.data.message);
              this.$router.push({ path: "/" });
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err); /* 若出现异常则在终端输出相关信息 */
          });
      }
    },
    countdown() {
      if (this.csendMsg > 0) {
        this.isDisable = true;
        setTimeout(() => {
          this.csendMsg -= 1;
          this.countsec = this.csendMsg;
          this.countdown();
        }, 1000);
      } else {
        this.countsec = "";
        this.isDisable = false;
      }
    },
  },
  mounted() {
    console.log(this.csendMsg);
  },
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registertitle {
  font-size: 29px;
  font-family: "FZShuTi";
}

.StarMap {
  z-index: -1;
  background-color: transparent;
  width: 25vw;
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
  width: 300px;
  height: 400px;
  margin-top: 3vh;
  line-height: 40px;
  position: relative;
  display: inline-block;

  border-color: black;
  border: 5px;
  background-color: rgba(234, 253, 255, 0.85);
  border-radius: 20px;
}
#login .form {
  padding: 30px 25px 0 25px;
  position: relative;
}
#login .msgholder {
  width: 50%;
  float: left;
}
#login .input_title {
  color: #000000b8;
  font-size: 15px;
  font-family: "Helvetica Neue";
  margin-top: 10px;
  float: left;
}
#login .btn_login {
  margin-top: 25px;
  text-align: center;
}
#login .btn_login button {
  line-height: 10px;
  font-family: "Helvetica Neue";
  /* 'Noto Serif SC', serif */
  background-color: #31d3fe;
  color: white;
  border: none;
  width: 100%;
  height: 38px;
}
#login .msgbt:hover {
  color: #31d3fe;
  border: 1px, solid #31d3fe;
}
</style>