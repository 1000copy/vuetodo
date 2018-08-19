import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const defaultTodo = [
      {id:1,subject:'Eating'},
      {id:2,subject:'Loving'},
      {id:3,subject:'Preying'},
    ]
function indexById(todos,id){
  for (var i = 0; i < todos.length; i++) {
    if (id == todos[i].id)
      return i
  }
  return -1
}
import axios from 'axios'
export default new Vuex.Store({
  state: {
  	msg:'Todo App',
  	todos:defaultTodo
  },
  mutations: {
  	add(state,subject){
      axios ({
        method: 'POST',
        url:'/api/todo',
        headers:[{'Content-Type':'application/json'}],
        data: {subject:subject}
        // data: JSON.stringify({subject:subject})
      })
      .then( res => {state.todos.push(res.data)})
      .catch( err => console.error(err))
  		// state.todos.push({id:subject,subject:subject})
  	},
  	remove(state,id){
      // console.log(id)
  		state.todos.splice(indexById(state,id),1)
  	},
    reload(state){
      state.todos = defaultTodo
    }
  },
  actions: {
	add: (context, link) => {       // Add this:
      context.commit("add", link)
    },
    remove: (context, link) => {       // Add this:
      context.commit("remove", link)
    },
    reload: (context) => {       // Add this:
      context.commit("reload")
    }
  }
})
