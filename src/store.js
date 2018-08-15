import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  	msg:'Todo App',
  	todos:[
      'Eating',
      'Loving',
      'Writing'
    ]
  },
  mutations: {
  	add(state,todo){
  		state.todos.push(todo)
  	},
  	remove(state,todo){
  		state.todos.splice(todo,1)
  	}
  },
  actions: {
	add: (context, link) => {       // Add this:
      context.commit("add", link)
    },
    remove: (context, link) => {       // Add this:
      context.commit("remove", link)
    }
  }
})
