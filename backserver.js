var M = require('./VisitMongo')
const defaultTodo = [
      {id:1,subject:'Eating'},
      {id:2,subject:'Loving'},
      {id:3,subject:'Preying'},
    ]
  var express = require('express');
  var app = express();
  var path = require('path')
  var bodyParser = require('body-parser')
  app.use(bodyParser.json())
  var todos = []
  var public = path.join(__dirname, '/')
  app.use('/',express.static(public))
  function rs(){
    todos = defaultTodo
  }
  rs()
  function indexById(id){
  	for (var i = 0; i < todos.length; i++) {
  		if (id ==todos[i].id)return i
  	}
  	return -1
  }
  
  var m = new M()
  app.delete('/api/todo/:id', async function (req, res) {
  	var userkey = req.params.id
    await m.deleteDoc(userkey)
    todos.splice(indexById(userkey),1)
    res.end( JSON.stringify(todos));
  })
  app.get('/api/todos', async function (req, res) {
  	var todos = await m.allDoc()
    res.end( JSON.stringify(todos));  
  })
  app.post('/api/todo', async function (req, res) {
    var _id = await m.insertDoc(req.body.subject)
    var obj ={id:_id,subject:req.body.subject}
    todos.push(obj)
    res.end(JSON.stringify(obj))
    rs()
  })
  var server = app.listen(8181, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
  })