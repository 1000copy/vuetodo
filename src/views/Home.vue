<template>
  <div class="home">
    <h1>{{msg}}</h1>
    <NewTodo></NewTodo>
    <TodoList></TodoList>
  </div>
</template>
<script>
import NewTodo from '@/components/NewTodo.vue'
import TodoList from '@/components/TodoList.vue'
import {mapState,mapActions} from 'vuex'
import axios from 'axios';
export default {
  name: 'home',
  computed:mapState(['todos','msg']),
  components: {
    TodoList,NewTodo
  },
  data(){
  	return{newtodo:''}
  },
  methods:{
  	...mapActions([
      'remove',
      'add'
    ]),
  	add1:function(){
  		this.add(this.newtodo)
  		this.newtodo = ''
  	},
  },
   mounted(){
      // var url  = 'https://api.coindesk.com/v1/bpi/currentprice.json'
      // var url  = '/api/1'
      // axios ({
      //       url:url,
      //       method: 'get',
      //   })
      //   .then( res => {console.log(res.data)} )
      //   .catch( err => console.error(err))
    }

}
</script>
