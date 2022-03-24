<template>
  <div id="app">
    <v-app id="inspire">
      <headhb />
      <v-row>
        <v-col class="warp">
          <v-card class="table_card">
            <v-container fluid>
              <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                :page.sync="page"
                :search="search"
                :sort-by="sortBy"
                :sort-desc="sortDesc"
                hide-default-footer
              >
                <!-- 头部 -->
                <template v-slot:header>
                  <v-toolbar dark color="rgba(239,161,141,0.8)" class="mb-1">
                    <!-- 搜索 -->
                    <v-text-field
                      v-model="search"
                      clearable
                      flat
                      solo-inverted
                      hide-details
                      label="Search"
                    ></v-text-field>
                    <!-- 排序以及升降序 -->
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                      <v-spacer></v-spacer>
                      <v-select
                        v-model="sortBy"
                        flat
                        solo-inverted
                        hide-details
                        :items="keys"
                        label="Sort by"
                      ></v-select>
                      <v-spacer></v-spacer>
                      <v-btn-toggle v-model="sortDesc" mandatory>
                        <v-btn
                          large
                          depressed
                          color="rgba(239,161,141)"
                          :value="false"
                        >
                          <!-- <v-icon>mdi-arrow-up</v-icon> -->
                          <div>升序</div>
                        </v-btn>
                        <v-btn
                          large
                          depressed
                          color="rgba(239,161,141)"
                          :value="true"
                        >
                          <!-- <v-icon>mdi-arrow-down</v-icon> -->
                          <div>降序</div>
                        </v-btn>
                      </v-btn-toggle>
                    </template>
                  </v-toolbar>
                </template>
                <!-- 表格内容 -->
                <template v-slot:default="props">
                  <v-row class="tablebody">
                    <v-col
                      v-for="item in props.items"
                      :key="item.NAME"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                    >
                      <v-card>
                        <!-- 表格的头部 -->
                        <v-row>
                          <!-- 头像 -->
                          <v-col cols="3" class="imgwarp">
                            <!-- 头像放在button中 -->
                            <img
                              class="touxiang"
                              width="45vw"
                              height="45vh"
                              :src="item.AVATAR_URL"
                              @click="hithead(item)"
                              style="cursor: pointer"
                            />
                            <!-- 弹框放在外部组件中 -->
                          </v-col>
                          <!-- 名字 -->
                          <v-col cols="7">
                            <v-card-title
                              class="subheading font-weight-bold"
                              float
                              style="padding-left: 0"
                            >
                              {{ item.NAME }}
                            </v-card-title>
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <!-- 列表具体内容 -->
                        <v-list dense class="list">
                          <v-list-item
                            v-for="(key, index) in filteredKeys"
                            :key="index"
                          >
                            <!-- <v-list-item-content
                              :class="{ 'blue--text': sortBy === key }"
                            >
                              {{ transform(key) }}:
                            </v-list-item-content>
                            <v-list-item-content
                              class="align-end"
                              :class="{ 'blue--text': sortBy === key }"
                            >
                              {{ item[key] }}
                            </v-list-item-content> -->
                            <v-row class="EachItem">
                              <v-col class="itemf">
                                <v-list-item-content
                                  :class="{ 'blue--text': sortBy === key }"
                                  
                                >
                                  {{ transform(key) }}:
                                </v-list-item-content>
                              </v-col>
                              <v-col class="items">
                                <v-list-item-content
                                  class="align-end"
                                  :class="{ 'blue--text': sortBy === key }"
                                >
                                  {{ item[key] }}
                                </v-list-item-content>
                              </v-col>
                            </v-row>
                          </v-list-item>
                        </v-list>
                        <v-divider></v-divider>
                        <!-- 标签 -->
                        <v-card-title
                          class="subheading font-weight-bold"
                          id="Tokentitle"
                          float
                        >
                          {{ "Tokens:" }}
                        </v-card-title>
                        <div class="tokens" style="height: 17vh">
                          <v-chip
                            color="rgba(110,112,116,0.77)"
                            text-color="white"
                            class="chips"
                            v-if="item['TAG1'] == ''?false:true" 
                            >{{ item["TAG1"] }}</v-chip
                          >
                          <v-chip
                            color="rgba(110,112,116,0.77)"
                            text-color="white"
                            class="chips"
                            v-if="item['TAG2'] == ''?false:true" 
                            >{{ item["TAG2"] }}</v-chip
                          >
                          <v-chip
                            color="rgba(110,112,116,0.77)"
                            text-color="white"
                            class="chips"
                            v-if="item['TAG3'] == ''?false:true" 
                            >{{ item["TAG3"] }}</v-chip
                          >
                          <v-chip
                            color="rgba(110,112,116,0.77)"
                            text-color="white"
                            class="chips"
                             v-if="item['TAG4'] == ''?false:true" 
                            >{{ item["TAG4"] }}</v-chip
                          >
                          <v-chip
                            color="rgba(110,112,116,0.77)"
                            text-color="white"
                            class="chips"
                             v-if="item['TAG5'] == ''?false:true" 
                            >{{ item["TAG5"] }}</v-chip
                          >
                          <!-- <v-chip
                            v-for="iotoken in item.usertoken"
                            :key="iotoken"
                            color="rgba(110,112,116,0.77)"
                            text-color="white"
                            class="chips"
                          >
                            {{ iotoken }}
                          </v-chip> -->
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
                <!-- 底部的构造 -->
                <template v-slot:footer>
                  <v-row class="mt-2" align="center" justify="center">
                    <span class="grey--text">Items per page</span>
                    <!-- 选取一个界面展示多少个词条 -->
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          dark
                          text
                          color="primary"
                          class="ml-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ itemsPerPage }}
                          <v-icon></v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(number, index) in itemsPerPageArray"
                          :key="index"
                          @click="updateItemsPerPage(number)"
                        >
                          <v-list-item-title>{{ number }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-spacer></v-spacer>

                    <span class="mr-4 grey--text">
                      Page {{ page }} of {{ numberOfPages }}
                    </span>
                    <!-- 前进后退按钮 -->
                    <v-btn class="pagebtn" depressed @click="formerPage">
                      <div>上一页</div>
                    </v-btn>

                    <v-btn class="pagebtn" depressed @click="nextPage">
                      <div>下一页</div>
                    </v-btn>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <!-- 弹窗 -->
      <!-- <v-dialog v-model="dialog2" max-width="44vw" max-height="100vh">
        <v-card class="mx-auto" width="40vw">
          <img width="70vw" height="70vh" class="touxiang1" :src="Nitem.AVATAR_URL" />

          <v-card-title class="ex_name">
            {{ Nitem.NAME }}
          </v-card-title>

          <v-card-subtitle class="ex_say">
            {{ "To be or not to be" }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text> More </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="changeshowvalue">
              <v-card-text class="ex_down">{{
                show == true ? "关闭" : "展开"
              }}</v-card-text>
            </v-btn>
          </v-card-actions>
          下拉内容
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-row class="ex_row">
                <v-col cols="7" class="ex_f"
                  ><v-card-text class="ex_card_text">{{
                    "Fans:"
                  }}</v-card-text></v-col
                >
                <v-col cols="3" class="ex_s"
                  ><v-card-text class="ex_card_text">{{
                    Nitem.FOLLOWERS_COUNT
                  }}</v-card-text></v-col
                >
              </v-row>
              <v-row class="ex_row">
                <v-col cols="7" class="ex_f"
                  ><v-card-text class="ex_card_text">{{
                    "Issues:"
                  }}</v-card-text></v-col
                >
                <v-col cols="3" class="ex_s"
                  ><v-card-text class="ex_card_text">{{
                    Nitem.ISSUES_COUNT
                  }}</v-card-text></v-col
                >
              </v-row>
              <v-row class="ex_row">
                <v-col cols="7" class="ex_f"
                  ><v-card-text class="ex_card_text">{{
                    "Commits:"
                  }}</v-card-text></v-col
                >
                <v-col cols="3" class="ex_s"
                  ><v-card-text class="ex_card_text">{{
                    Nitem.COMMITS_COUNT
                  }}</v-card-text></v-col
                >
              </v-row>
              <v-row class="ex_row">
                <v-col cols="7" class="ex_f"
                  ><v-card-text class="ex_card_text">{{
                    "Pull_Request:"
                  }}</v-card-text></v-col
                >
                <v-col class="ex_s"
                  ><v-card-text class="ex_card_text">{{
                    Nitem.PULLREQUESTS_COUNT
                  }}</v-card-text></v-col
                >
              </v-row>
              <v-row class="ex_row">
                <v-col cols="7" class="ex_f"
                  ><v-card-text class="ex_card_text">{{
                    "UpdatedTime:"
                  }}</v-card-text></v-col
                >
                <v-col cols="3" class="ex_s"
                  ><v-card-text class="ex_card_text">{{
                    Nitem.UPDATED_TIME
                  }}</v-card-text></v-col
                >
              </v-row>
            </div>
          </v-expand-transition>
        </v-card>
      </v-dialog> -->
    </v-app>
  </div>
</template>
<script>
import user from "@/store/user";
import headhb from "@/components/HeadVue.vue";
export default {
  name: "CustomerAll",
  data() {
    return {
      itemsPerPageArray: [4, 8, 10],
      search: "",
      dialog2: false,
      show: false,
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "NAME",
      keys: ["FOLLOWERS_COUNT", "PULLS_COUNT", "COMMITS_COUNT", "ISSUES_COUNT"],
      items: [],
      Nitem: {},
      //items=Vue.prototype.vi_user,
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(
        (key) =>
          //key == "UPDATED_TIME" ||
          key == "FOLLOWERS_COUNT" ||
          key == "PULLS_COUNT" ||
          key == "COMMITS_COUNT" ||
          key == "ISSUES_COUNT"
      );
    },
  },
  methods: {
    transform(key) {
      console.log(key);
      if (key == "FOLLOWERS_COUNT") return "Fans";
      if (key == "COMMITS_COUNT") return "Commits";
      if (key == "ISSUES_COUNT") return "Issues";
      if (key == "PULLS_COUNT") return "Pull_request";
      if (key == "UPDATED_TIME") return "Updated_time";
      // if (key.equals("FOLLOWERS_COUNT")) return "Fans";
      // if (key.equals("COMMITS_COUNT")) return "Commits";
      // if (key.equals("ISSUES_COUNT")) return "Issues";
      // if (key.equals("PULLS_COUNT")) return "Pull_request";
      // if (key.equals("UPDATED_TIME")) return "Updated_time";
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    changeshowvalue() {
      this.show = !this.show;
      console.log(this.show);
    },
    hithead(item) {
      this.Nitem = item;
      this.dialog2 = true;
    },
  },
  //   created(){
  //       this.items=Vue.prototype.$vi_user;
  //   }
  created() {
    this.items = user.getters.getUser(user.state()).user.search;
    //console.log(this.items);
  },
  components: { headhb },
};
</script>
<style scoped>
.imgwarp {
  padding-top: 2.7vh;
  padding-left: 2vw;
  align-items: center;
}
.inspire {
  margin-top: 21vh;
}
.touxiang {
  margin-top: calc(50%-45vw);
  align-self: center;
}
.warp {
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 7.85vh;
  padding-bottom: 5vh;
  /* background-color: #efa18d; */
}
.list{
  margin-bottom: 3vh;
}
.EachItem {
  height: 5vh;
}
.table_card {
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 1vh;
  padding-bottom: 2vh;
}
.tablebody {
  margin-top: 1vh;
}
.itemf{
  padding-left: 4vw;
}
.items{
  margin-left: 0vw;
  padding-right: 0vw;
}
#Tokentitle {
  padding-bottom: 1vh;
}
.tokens{
  padding-left: 1vw;
}
.chips {
  margin-left: 0.5vw;
  margin-right: 0.5vw;
  margin-top: 0.3vh;
  margin-bottom: 0.6vh;
  float: left;
}
.mt-2 {
  padding-top: 2vh;
  padding-left: 2vw;
}
.pagebtn {
  color: #d87c7c;
  margin-left: 2vw;
}
.ex_name {
  font-size: larger;
}
.ex_say {
  text-align: left;
}
.ex_down {
  font-size: small;
}
.ex_f {
  text-align: left;
  padding: 0;
}
.ex_s {
  text-align: left;
  padding: 0;
}
.ex_row {
  margin-top: 0vh;
  margin-bottom: 0vh;
}
.ex_card_text {
  padding-top: 1vh;
  padding-bottom: 2vh;
  margin-left: 2vw;
}
</style>