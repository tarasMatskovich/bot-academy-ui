import Vue from 'vue'
import VueRouter from 'vue-router'
import SignInView from "@/views/Auth/SignInView";
import SignUpView from "@/views/Auth/SignUpView";
import MainPageView from "@/views/Main/MainPageView";
import Store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MainPageView
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInView
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach( (to, from, next) => {
  if (
      // make sure the user is authenticated
      !Store.getters['users/isLoggedIn'] &&
      // ❗️ Avoid an infinite redirect
      (to.name !== 'sign-in' && to.name !== 'sign-up' && to.name !== 'reset-password')
  ) {
    // redirect the user to the login page
    next({ name: 'sign-in' })
  }

  if (
      Store.getters['users/isLoggedIn'] &&
      (to.name === 'sign-in' || to.name === 'sign-up' || to.name === 'reset-password')
  ) {
    next(from)
  }

  return next();
})

export default router
