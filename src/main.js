import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import Login from './components/Login.vue';
import Main from './components/Main.vue';
import Chat from './components/Chat.vue';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.config.productionTip = false

const store = new Vuex.Store({
  modules: {
    //модуль регистрации/авторизации.
    auth: {
      state: {
        currentUser: null
      },
      mutations: {
        setCurrentUser(state, payload) {
          state.currentUser = payload;
        },
        logout(state) {
          state.currentUser = null;
        },
      },
      actions: {
        setUserAction({commit}, {username, password}) {
          const user = {
              username,
              password,
              hashName: `@${username}`,
              presence: 'online'
          }
          localStorage.setItem('user', JSON.stringify(user));
          commit('setCurrentUser', user);
          commit('addMemberToAllChannels',user);
          router.push('/');
        },
        logout({commit}) {
          const user = JSON.parse(localStorage.getItem('user'));
          localStorage.removeItem('user');
          commit('logout');
          commit('setPresenceToOffline', user);
          router.push('/');
        }
      }
    },
    //Модуль Каналы.
    channels: {
      state: {
        channels: {
          'general': {
            name: 'general',
            selected: false,
            messages: [],
            members: []
          },
          'weapons': {
            name: 'weapons',
            selected: false,
            messages: [],
            members: []
          },
          'combat': {
            name: 'combat',
            selected: false,
            messages: [],
            members: []
          }
        }
      },
      getters: {
        getChannelByCurrentRoute: state => route => {
          return state.channels[route]
        },
        getChannelMessagesByCurrentRoute: state => route => {
          return state.channels[route].messages;
        },
        getChannelMembersByCurrentRoute: state => route => {
          return state.channels[route].members
        }
      },
      mutations: {
        setSelectedChannel(state, channelName) {
           for (let key in state.channels) {
             state.channels[key].selected = key === channelName;
           }
        },
        addMemberToAllChannels(state, member) {
          for (let key in state.channels) {
            if (!state.channels[key].members.includes(member)) {
              state.channels[key].members.push(member);
            }
          }
        },
        addMemberToChannel(state, channelKey, member) {
          state.channels[channelKey].members.push(member);
        },
        setPresenceToOffline(state, member) {
          for (let key in state.channels) {
            state.channels[key].members.forEach(function(elem) {
              if (elem.username === member.username) {
                elem.presence = 'offline'
              }
            })
          }
        },
        pushMessage(state, data) {
          const message = {
            message: data.message.content,
            author: data.message.author,
            date: data.message.date
          }
          state.channels[data.channelKey].messages.push(message);
        }
      },
      actions: {
        setSelectedChannelAction({commit}, channelName) {
          commit('setSelectedChannel', channelName);
        },
        pushMessageAction({commit}, data) {
          commit('pushMessage', data);
        },
        addMemberToAllChannelsAction({commit}, member) {
          commit('addMemberToAllChannels', member);
        },
        addMemberToChannelAction({commit}, channelName, member) {
          commit('addMemberToChannel', channelName, member);
        }
      }
    }
  }
})

const routes = [
  {path: '', component: Main,
    children: [
      {
        path: 'general',
        component: Chat
      },
      {
        path: 'weapons',
        component: Chat
      },
      {
        path: 'combat',
        component: Chat
      }
    ]
  },
  {path: '/login', component: Login}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
