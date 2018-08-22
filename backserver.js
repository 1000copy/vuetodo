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
  class M {
    constructor(){
      this.getCol = ()=>{
        return this.dbo.collection("todo")
      }
      this.m_open = async ()=>{
        const connectionString = 'mongodb://localhost:27017';
        this.client = await mongo.MongoClient.connect(connectionString,
            { useNewUrlParser: true });
        this.dbo = this.client.db('todos');
      }
      this.insertDoc = async (subject)=>{
        return  this.template(async ()=>{
           var res = await this.getCol().insertOne({subject:subject})
           return res.insertedId
        })
        // await this.m_open()
        // try {
        //    var res = await this.getCol().insertOne({subject:subject})
        //    return res.insertedId
        // }
        // finally {
        //   this.client.close();
        // }
      }
      this.deleteDoc = async (_id)=>{
        return  this.template(async ()=>{
          await this.getCol().deleteMany({_id:new mongo.ObjectID(_id)})
        })
          // await this.m_open()
          // try{
          //   await this.getCol().deleteMany({_id:new mongo.ObjectID(_id)})
          // }
          // finally {
          //     this.client.close();
          // }
      }
      this.template = async (cb)=>{
         try {
           await this.m_open()
           // return cb.apply(this)
           return cb()
        }
        finally {
            this.client.close();
        }
      }
      this.allDoc = async ()=>{
        return this.template(async ()=>{
           var r = await this.getCol().find().toArray()
           var ts = []
           for (var i = 0; i < r.length; i++) {
             ts.push({id:r[i]._id,subject:r[i].subject})
           }
           return ts
        })
        // try {
        //    await this.m_open()
        //    var r = await this.getCol().find().toArray()
        //    var ts = []
        //    for (var i = 0; i < r.length; i++) {
        //      ts.push({id:r[i]._id,subject:r[i].subject})
        //    }
        //    return ts
        // }
        // finally {
        //     this.client.close();
        // }
      }
    }
  }
  
  class M2 {
    getCol(_this){
      return _this.dbo.collection("todo")
    }
    async  insertDoc(_this,subject){
      await _this.m_open(_this)
      try {
         var res = await _this.getCol(_this).insertOne({subject:subject})
         return res.insertedId
      }
      finally {
        _this.client.close();
      }
    }
    async  deleteDoc(_this,_id){
      await _this.m_open(_this)
      try{
        await _this.getCol(_this).deleteMany({_id:new mongo.ObjectID(_id)})
      }
      finally {
          _this.client.close();
      }
    }
    async  m_open(_this){
      const MongoClient = mongo.MongoClient;
      const connectionString = 'mongodb://localhost:27017';
      _this.client = await MongoClient.connect(connectionString,
          { useNewUrlParser: true });
      _this.dbo = _this.client.db('todos');
    }
    async  allDoc(_this){
      try {
          await _this.m_open(_this)
           var r = await _this.getCol(_this).find().toArray()
           var ts = []
           for (var i = 0; i < r.length; i++) {
             ts.push({id:r[i]._id,subject:r[i].subject})
           }
           return ts
      }
      finally {
          _this.client.close();
      }
    }
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