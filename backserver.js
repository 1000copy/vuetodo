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
  app.delete('/api/todo/:id', function (req, res) {
    var userkey = +req.params.id
    todos.splice(userkey,1)
    res.end( JSON.stringify(todos));
    rs()
  })
  app.get('/api/todos', function (req, res) {
    res.end( JSON.stringify(todos));
  })
  function insertDoc(subject,callback){
  	const MongoClient = require('mongodb').MongoClient;
	const connectionString = 'mongodb://localhost:27017';
	(async () => {
	    const client = await MongoClient.connect(connectionString,
	        { useNewUrlParser: true });
	    const dbo = client.db('todos');
	    try {
	       var res = await dbo.collection('todo').insertOne(
	        {subject:subject})
	       console.log(res.insertedId)
	       callback(undefined,res.insertedId)
	    }
	    catch(err){
	    	callback(err)
	    }
	    finally {
	        client.close();
	    }
	})().catch(err => console.error(err));
  }
  app.post('/api/todo', function (req, res) {
  	console.log(req.body)
    insertDoc(req.body.subject,function(err,_id){
    	var obj ={id:_id,subject:req.body.subject}
		todos.push(obj)
		res.end(JSON.stringify(obj))
	    rs()
  	})
  	
  })
  var server = app.listen(8181, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("listening at http://%s:%s", host, port)
  })