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
  var mongo = require('mongodb')
  function insertDoc(subject,callback){
    const MongoClient = mongo.MongoClient;
    const connectionString = 'mongodb://localhost:27017';
    (async () => {
        const client = await MongoClient.connect(connectionString,
            { useNewUrlParser: true });
        const dbo = client.db('todos');
        try {
           var res = await dbo.collection('todo').insertOne(
            {subject:subject})
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
  function deleteDoc(_id,callback){
  	const MongoClient = mongo.MongoClient;
  	const connectionString = 'mongodb://localhost:27017';
  	(async () => {
  	    const client = await MongoClient.connect(connectionString,
  	        { useNewUrlParser: true });
  	    const dbo = client.db('todos');
  	    try {
                var myquery = {_id:new mongo.ObjectID(_id)}
                var r = await dbo.collection("todo").deleteMany(myquery)
          }
          catch(err){
  	    	callback(err)
  	    }
  	    finally {
              client.close();
              callback()
          }
  	    
  	})().catch(err => console.error(err));
  }
  function allDoc(callback){
  	const MongoClient = mongo.MongoClient;
  	const connectionString = 'mongodb://localhost:27017';
  	(async () => {
  	    const client = await MongoClient.connect(connectionString,
  	        { useNewUrlParser: true });
  	    const dbo = client.db('todos');
  	    try {
               var r = await dbo.collection("todo").find().toArray()
               var ts = []
               for (var i = 0; i < r.length; i++) {
                 ts.push({id:r[i]._id,subject:r[i].subject})
               }
               callback(undefined,ts)
          }
          catch(err){
  	    	callback(err)
  	    }
  	    finally {
              client.close();
          }
  	    
  	})().catch(err => console.error(err));
  }
  app.delete('/api/todo/:id', function (req, res) {
  	var userkey = req.params.id
  	deleteDoc(userkey,function(){
  		todos.splice(indexById(userkey),1)
    	res.end( JSON.stringify(todos));
  	})
  })
  app.get('/api/todos', function (req, res) {
  	allDoc(function(err,todos){
  		res.end( JSON.stringify(todos));	
  	})
  })
  app.post('/api/todo', function (req, res) {
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