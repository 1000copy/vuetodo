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
      }
      this.deleteDoc = async (_id)=>{
        return  this.template(async ()=>{
          await this.getCol().deleteMany({_id:new mongo.ObjectID(_id)})
        })
      }
      this.template = async (cb)=>{
         try {
           await this.m_open()
           // return cb.apply(this)
           return cb()
        }
        catch(err){
        	console.log(err)
        }
        finally {
            this.client.close();
        }
      }
      this.allDoc = async ()=>{
        return await this.template(async ()=>{
           var r = await this.getCol().find().toArray()
           var ts = []
           for (var i = 0; i < r.length; i++) {
             ts.push({id:r[i]._id,subject:r[i].subject})
           }
           return ts
        })
      }
    }
  }
  module.exports= M;