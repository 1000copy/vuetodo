<template>
  <div class="hello">
    <ul>
    	<li v-for="(todo,index) in todos" v-bind:key="todo.id">
    		{{todo.subject}}
        <button @click="remove(todo.id)" class="rm">remove</button>
        <button @click="edit(todo.id)" class="rm">edit</button>
    	</li>
    </ul>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import ModalForm from '@/components/ModalForm.vue'
export default {
  name: 'todolist',
  computed:mapState(['todos','msg']),
  components: {
  },
  methods:{
  	...mapActions([
      'remove','reload'
    ]),
    edit(id){
      console.log(id)
      this.$modal.open({
          parent: this,
          component: ModalForm,
          hasModalCard: true
      })
    }
  },
  mounted(){
    this.reload()
  }
}
</script>
<style scoped>
</style>
