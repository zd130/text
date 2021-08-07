import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import task from '../views/tasj/task.vue'
import addEvent from '../views/event/addEvent.vue'
import event from '../views/tasj/event.vue'
import EventDetail from '../views/event/EventDetail.vue'
import confirehandler  from '../views/event/confirehandler.vue'
import TransferOrder  from '../views/event/TransferOrder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      show: true
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/task',
    name: 'task',
    component: task,
    meta: {
      show: true
    }
  },
  {
    path: '/addEvent',
    name: 'addEvent',
    component: addEvent,
    meta: {
      show: true
    }
  },
  {
    path: '/event',
    name: 'event',
    component: event,
    meta: {
      show: true
    }
  }, {
    path: '/EventDetail',
    name: 'EventDetail',
    component: EventDetail,
    meta: {
      show: true
    }
  },
  {
    path: '/confirehandler/:id',
    name: 'confirehandler',
    component: confirehandler,
    meta: {
      show: true
    }
  },
  {
    path: '/TransferOrder/:id',
    name: 'TransferOrder',
    component: TransferOrder,
    meta: {
      show: true
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
