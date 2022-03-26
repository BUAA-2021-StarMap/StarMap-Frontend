<template>
  <div id="app">
    <!-- <div>
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
    </div> -->
    <nav :class="[light ? 'navLight' : 'navDark']" class="transition">
      <div class="l1 transition" :class="[light ? 'boxLight' : 'boxDark']">
        <img src="../pic/logo_starmap.png" title="StarMap" class="StarMap" />
      </div>
      <div class="l2 transition" :class="[light ? 'boxLight' : 'boxDark']">
        <a href="/main" :class="[light ? 'LittleBoxLight' : 'LittleBoxDark']"
          >主页</a
        >
      </div>
      <div class="l3 transition" :class="[light ? 'boxLight' : 'boxDark']">
        <a href="#" :class="[light ? 'LittleBoxLight' : 'LittleBoxDark']"
          >联系我们</a
        >
      </div>
      <div class="l4 transition" :class="[light ? 'boxLight' : 'boxDark']">
        <a
          href="https://github.com/BUAA-OpenMap-Group"
          :class="[light ? 'LittleBoxLight' : 'LittleBoxDark']"
          >关于</a
        >
      </div>
      <div class="r3 transition" :class="[light ? 'boxLight' : 'boxDark']">
        <a href="#" :class="[light ? 'LittleBoxLight' : 'LittleBoxDark']"
          >消息</a
        >
      </div>
      <div class="r2 transition" :class="[light ? 'boxLight' : 'boxDark']">
        <a href="#" :class="[light ? 'LittleBoxLight' : 'LittleBoxDark']"
          >创作</a
        >
      </div>
      <div class="r1 transition" :class="[light ? 'boxLight' : 'boxDark']">
        <a href="/" :class="[light ? 'LittleBoxLight' : 'LittleBoxDark']"
          >登出</a
        >
      </div>
      <!-- 下拉式 再说吧
            <span class="eject icomoon"></span><span>设置</span>
            <span class="eject icomoon"></span><span>收藏</span>
            <span class="eject icomoon"></span><span>好友</span>
            <span class="eject icomoon"></span><span>信息</span> -->
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      light: true,
      dark: false,
    };
  },
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

.change {
  position: absolute;
  left: calc(50% - 325px);
  top: 132px;
  width: 70px;
  height: 37px;
  font-size: 20px;
  border: none;
  background-color: transparent;
}

.logo {
  background-color: transparent;
  width: auto;
  height: 37px;
}

.inputLight {
  position: absolute;
  left: calc(50% - 263px);
  top: 130px;
  width: 479px;
  height: 43px;
  background-color: #fbfbfb;
  font-size: 15px;
  border: 1px solid rgb(197, 197, 197);
  border-radius: 5px 0 0 5px;
  text-indent: 1em;
  box-shadow: 2px 2px 50px 2px rgb(228, 228, 228);
}
.inputLight:hover,
.inputLight:focus {
  background-color: white;
  border: 1px solid #ff8f91;
}
.inputDark {
  position: absolute;
  left: calc(50% - 263px);
  top: 130px;
  width: 479px;
  height: 43px;
  background-color: #292c30;
  font-size: 15px;
  border: 1px solid #7a828e;
  border-radius: 5px 0 0 5px;
  text-indent: 1em;
  color: #c2c2c3;
  box-shadow: 2px 2px 50px 2px rgb(32, 32, 32);
}
.inputDark:hover,
.inputDark:focus {
  background-color: #272b33;
  border: 1px solid #31d3fe;
  color: #f0f3f6;
}

.TagButton {
  position: absolute;
  left: calc(50% + 180px);
  top: 140px;
  font-size: 23px;
  color: #ffffff;
  border: none;
  background-color: transparent;
}

.searchLight {
  position: absolute;
  left: calc(50% + 214px);
  top: 130px;
  width: 46px;
  height: 43px;
  background-color: #ff8f91;
  color: white;
  font-size: 15px;
  border: none;
  border-radius: 0 5px 5px 0;
  box-shadow: 2px 2px 50px 2px rgb(228, 228, 228);
}
.searchDark {
  position: absolute;
  left: calc(50% + 214px);
  top: 130px;
  width: 46px;
  height: 43px;
  background-color: #31d3fe;
  color: #0a0c10;
  font-size: 15px;
  border: none;
  border-radius: 0 5px 5px 0;
  box-shadow: 2px 2px 50px 2px rgb(32, 32, 32);
}

.blockLight {
  position: absolute;
  top: 280px;
  height: 350px;
  width: 284px;
  border: 1px solid #ff8f91;
  background-color: white;
  opacity: 0.8;
  border-radius: 5px;
  box-shadow: 2px 2px 50px 2px rgb(228, 228, 228);
}
.blockLight:hover {
  color: #ff8f91;
}
.blockDark {
  position: absolute;
  top: 280px;
  height: 350px;
  width: 284px;
  border: 1px solid #31d3fe;
  border-radius: 5px;
  background-color: #272b33;
  opacity: 0.8;
  color: #fff5f9;
  box-shadow: 2px 2px 50px 2px rgb(32, 32, 32);
}
.blockDark:hover {
  color: #31d3fe;
}

.blockLinkLight:hover {
  color: #ff8f91;
}
.blockLinkDark:hover {
  color: #31d3fe;
}

.leaderboard {
  left: calc(50% - 626px);
}

.forum {
  left: calc(50% - 142px);
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
}

.ForumOne {
  position: absolute;
  top: 70px;
}

.ForumTwo {
  position: absolute;
  top: 135px;
}

.ForumThree {
  position: absolute;
  top: 200px;
}

.RankText {
  font-family: "STSong";
  font-size: 17px;
  text-indent: 1em;
}

.RankOne {
  position: absolute;
  top: 70px;
}

.RankTwo {
  position: absolute;
  top: 110px;
}

.RankThree {
  position: absolute;
  top: 150px;
}

.RankFour {
  position: absolute;
  top: 190px;
}

.RankFive {
  position: absolute;
  top: 230px;
}

.LittleAvatar {
  display: inline-block;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.FireAndNumLight {
  color: #ff8f91;
}
.FireAndNumDark {
  color: #31d3fe;
}

.community {
  left: calc(50% + 342px);
}

.navLight {
  position: absolute;
  top: 0;
  left: 0;
  height: 45px;
  width: 100%;
  background-color: white;
  box-shadow: 2px 2px 30px 2px rgb(241, 241, 241);
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
  left: 280px;
}

.l4 {
  position: absolute;
  top: 0;
  left: 366px;
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
  color: #ff8f91;
}
.LittleBoxDark {
  text-decoration: none;
  text-align: center;
  line-height: 300%;
  font-size: 15px;
  color: #fff5f9;
}
.LittleBoxDark:hover {
  color: #31d3fe;
}

.transition {
  text-decoration: none;
  transition: all 0.8s;
}
</style>