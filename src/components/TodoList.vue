<template>
  <div class="hello">
    <ul>
    	<li v-for="(todo,index) in todos" v-bind:key="index">
    		{{todo}}<button @click="remove(index)" class="rm">remove</button>
    	</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
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
