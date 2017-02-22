const mongodb = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb');
const url = 'mongodb://schola:schola123@ds033096.mlab.com:33096/schola1';

class StudentController {
    constructor(){

    }

    getMonogoDB(req, res, next){
        MongoClient.connect(url, (err, db)=>{
            req.db = db;
            next();
        });
    }

    //get all
    get(req, res){
        const collection = req.db.collection('students');
        
        collection.find({}).toArray((err, docs)=> {
            if(err){
                res.send("error");    
            }
            else{
                console.log(`Found student`);
                req.db.close();
                res.send(docs);        
            }
        });
    }
    
    //put
    put(req, res){
        //console.log(req.body);
        const collection = req.db.collection('students');
        
        collection.insertOne(req.body, (err, result)=>{
            if(err){
                res.send("error");    
            }
            else{
                res.send(result);
            }
        });        
    }
}

module.exports = new StudentController();
