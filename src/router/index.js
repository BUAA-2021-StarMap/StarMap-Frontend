import Vue from 'vue'
import VueRouter from 'vue-router'
import user from "@/store/user";


// npm run serve:  running state
// serve -s dist: not dependent on vue environment, start the application from dist/ 


Vue.use(VueRouter)

const routes = [
  {
    //over
    path: '/',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    //over
    path: '/register',
    name: 'RegisterView',
    component: () => import('../views/RegisterView.vue')
  },
  {
    //over
    path: '/forum',
    name: 'ForumAll',
    component: () => import('../views/ForumAll.vue')
  },
  {
    path: '/customer',
    name: 'CustomerAll',
    component: () => import('../views/CustomerAll.vue')
  },
  {
    //over
    path: '/forum/add',
    name: 'ForumAdd',
    component: () => import('../views/ForumEdit.vue')
  },
  {
    path: '/forum/:articleId',
    name: 'ForumDetails',
    component: () => import('../views/ForumDetails.vue')
  }, {
    path: '/forum/:articleId/edit',
    name: 'ForumEdit',
    component: () => import('../views/ForumEdit.vue')
  },
  {
    path: '/sort',
    name: 'SortView',
    component: () => import('../views/SortView.vue')
  },
  {
    path: '/main',
    name: 'MainView',
    component: () => import('../views/MainMenu.vue')
  },
  // },
  // {
  //   path: '/debug',
  //   name: 'RegisterView',
  //   component: () => import('../views/AboutView')
  // }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  //base: '/admin/',
})

router.beforeEach((to, from, next) => {
  // 通过 Vuex 获取用户登录信息
  const userInfo = user.getters.getUser(user.state());

  if (to.path === '/loginView') {
    localStorage.setItem("preRoute", router.currentRoute.fullPath);
  }

  // 若用户未登录且访问的页面需要登录，则跳转至登录页面
  if (!userInfo && to.meta.requireAuth) {
    next({
      name: 'LoginView',
    })
  }

  next()
})

export default router
