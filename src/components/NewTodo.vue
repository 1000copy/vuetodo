<template>
  <div class="home">
    <form @submit.prevent="add1">
    	<input type="text" name="newTodo" placeholder="new todo" v-model="newtodo">
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapState,mapActions} from 'vuex'
export default {
  name: 'newtodo',
  computed:mapState(['todos','msg']),
  data(){
  	return{newtodo:''}
  },
  methods:{
  	...mapActions([
      'add'
    ]),
  	add1:function(){
  		this.add(this.newtodo)
  		this.newtodo = ''
  	}
  }
}
</script>
