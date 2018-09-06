<template>
	 <form action="" @submit.prevent>
		<div class="modal-card" style="width: auto">
		    <header class="modal-card-head">
		        <p class="modal-card-title">Edit Todo</p>
		    </header>
		    <section class="modal-card-body">
		        <b-field label="Subject">
		            <b-input
		                type="text"
		                v-model="subject"
		                placeholder="Your subject"
		                required>
		            </b-input>
		        </b-field>

		        <!-- <b-field label="Password">
		            <b-input
		                type="text"
		                :value="password"
		                password-reveal
		                placeholder="Your password"
		                required>
		            </b-input>
		        </b-field>
		        <b-checkbox>Remember me</b-checkbox>
 -->
		    </section>
		    <footer class="modal-card-foot">
		        <button class="button" type="button" @click="$parent.close()">Cancel</button>
		        <button class="button is-primary" @click="save()">Save</button>
		    </footer>
		</div>
	</form>
</template>
<script type="text/javascript">
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
	// props: ['subject', 'password'],
	data(){
		return{subject:''}
	},
	computed:{...mapState(['activeId','activeTodo']),...mapGetters(['getTodoById'])},
	mounted(){
		console.log(this.activeId,this.activeTodo.subject)
		this.$data.subject = this.activeTodo.subject
		this.$data.password = this.activeTodo.id

	},
	methods:{
		...mapActions([
	      'saveIt'
	    ]),
		save(){
			this.saveIt(this.subject)
			this.$parent.close()
		}
	}
}
</script>