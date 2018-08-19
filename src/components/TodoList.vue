<template>
  <div class="hello">
    <ul>
    	<li v-for="(todo,index) in todos" v-bind:key="todo.id">
    		{{todo.subject}}<button @click="remove(todo.id)" class="rm">remove</button>
    	</li>
    </ul>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'todolist',
  computed:mapState(['todos','msg']),
  components: {
  },
  methods:{
  	...mapActions([
      'remove',
    ])
  }
}
</script>
<style scoped>
</style>
