var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
var todos = []
var public = path.join(__dirname, '/')
app.use('/',express.static(public))
function indexById(id){
  for (var i = 0; i < todos.length; i++) {
    if (+todos[i].id == id)
      return i
  }
}
function rs(){
  todos = [
         {"id" : "1","subject":"s1"},
         {"id" : "2","subject":"s2"},
         {"id" : "3","subject":"s3"},
      ]
}
rs()
app.put('/todo/:id', function (req, res) {
  var userkey = indexbyId(parseInt(req.params.id))
  todos[userkey] = req.body
  res.end( JSON.stringify(todos));
  rs()
})
app.delete('/todo/:id', function (req, res) {
  console.log('here is DELETE')
  var userkey = indexById(parseInt(req.params.id))
  todos.splice(userkey,1)
  res.end( JSON.stringify(todos));
  rs()
})
app.get('/todo/:id', function (req, res) {
  var userkey = indexById(parseInt(req.params.id))
  res.end( JSON.stringify(todos[userkey]));
})
app.get('/todos', function (req, res) {
  res.end( JSON.stringify(todos));
})
app.post('/todo', function (req, res) {
  todos.push(req.body)
  res.end(JSON.stringify(todos))
  rs()
})
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("listening at http://%s:%s", host, port)
})