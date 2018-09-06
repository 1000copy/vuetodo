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
function httpadd(subject,cb){
  axios ({
        method: 'POST',
        url:'/api/todo',
        headers:[{'Content-Type':'application/json'}],
        data: {subject:subject}
      })
      .then( res => cb(res.data))
      .catch( err => console.error(err))
}
function httpremove(id,cb){
  axios ({
        url:'/api/todo/'+id,
        method: 'delete',
      })
      .then( res => {
          cb()
      })
      .catch( err => console.error(err))
}
function httpreload(cb){
  axios ({
        url:'/api/todos',
        method: 'get',
      })
      .then( res => {
          cb(res.data)
      })
      .catch( err => console.error(err))
}
var getTodoById= (state, id) => {
  for (var i = 0; i < state.todos.length; i++) {
    var todo = state.todos[i]
    if (todo.id == id )return todo
  }
  return undefined
}
import axios from 'axios'
export default new Vuex.Store({
  getters: {
  },
  state: {
  	msg:'Todo App',
  	todos:defaultTodo,
    activeId : '',
    activeTodo:{}
  },
  mutations: {
    setId(state,id){
      state.activeId = id 
      state.activeTodo = getTodoById(state,id)
    },
    saveIt(state, subject){
      state.activeTodo.subject = subject
    },
  	add(state,subject){
      httpadd(subject,function(todo){
        state.todos.push(todo)
      })
  	},
  	remove(state,id){
      httpremove(id,function(){
        state.todos.splice(indexById(state.todos,id),1)  
      })
  	},
    reload(state){
      httpreload(function(todos){
        // console.log(todos)
        state.todos = todos
      })
      // state.todos = defaultTodo
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
    },
    setId:(context,id) =>{
      context.commit("setId",id)
    },
    saveIt:(context,subject) =>{
      context.commit("saveIt",subject)
    }
  }
})
