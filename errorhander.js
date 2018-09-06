function errormaker(){
	var a = 0 
	return 1/a
}
function errormaker(){
	throw new Error('throw error')
}
process.on('uncaughtException',function(err){
	console.log(err)
})
// console.log(errormaker())
  var express = require('express');
  var app = express();
  var path = require('path')
  var bodyParser = require('body-parser')
  app.use(bodyParser.json())
  var todos = []
  var public = path.join(__dirname, '/')
  app.get('/api/todos', async function (req, res) {
  	var todos = [{id:1,subject:'1'}]
  	errormaker()
    res.end( JSON.stringify(todos));  
  })
  var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
  })