<template>
  <div id="app">
    <nav class="navLight transition">
      <div class="l1 transition boxLight">
        <img src="../pic/logo_starmap.png" title="StarMap" class="StarMap" />
      </div>
      <div class="l2 transition boxLight">
        <a href="/main" class="LittleBoxLight transition">主页</a>
      </div>
      <div class="l3 transition boxLight">
        <a href="#" class="LittleBoxLight transition">联系我们</a>
      </div>
      <div class="l4 transition boxLight">
        <a
          href="https://github.com/BUAA-OpenMap-Group"
          class="LittleBoxLight transition"
          >关于</a
        >
      </div>
      <div class="r3 transition boxLight">
        <a href="#" class="LittleBoxLight transition">消息</a>
      </div>
      <div class="r2 transition boxLight">
        <a href="#" class="LittleBoxLight transition">创作</a>
      </div>
      <div class="r1 transition boxLight">
        <a href="/" class="LittleBoxLight transition">登出</a>
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

.navLight {
  position: absolute;
  top: 2px;
  left: 2px;
  height: 45px;
  width: 100%;
  background-color: white;
  box-shadow: 2px 2px 30px 2px rgb(241, 241, 241);
}

.boxLight {
  box-shadow: none;
  display: inline;
  height: 100%;
  width: 112.5px;
  background-color: white;
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
  top: -1px;
  left: 10px;
}

.l2 {
  position: absolute;
  top: 2px;
  left: 170px;
}

.l3 {
  position: absolute;
  top: 2px;
  left: 260px;
}

.l4 {
  position: absolute;
  top: 2px;
  left: 346px;
}

.r1 {
  position: absolute;
  top: 2px;
  right: 0;
}

.r2 {
  position: absolute;
  top: 2px;
  right: 80px;
}

.r3 {
  position: absolute;
  top: 2px;
  right: 160px;
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

.transition {
  text-decoration: none;
  transition: all 0.4s;
}
</style>