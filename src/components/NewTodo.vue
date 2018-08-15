<template>
  <div class="home">
    <form @submit.prevent="add1">
    	 <b-input type="text" name="newTodo" placeholder="new todo" v-model="newtodo"></b-input>
    </form>
  </div>
</template>
<script>
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
