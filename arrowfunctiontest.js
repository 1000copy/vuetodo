class C{
	async a(){
		console.log(this.book)
	}
	b(){
		console.log(this.book)
	}
	async d(){
		await this.a()
	}
	constructor(){
		this.book = 1
		this.c = ()=>{console.log(this.book)}
	}
}
(async()=>{
	var c = new C()
	c.a()
	c.b()
	c.c()
	await c.d()
})()