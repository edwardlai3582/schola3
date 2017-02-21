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

    //get by id
    get(req, res){
        const collection = req.db.collection('students');
        
        collection.findOne({ 'sid': req.query.id}, (err, docs)=> { //'_id': new ObjectID(req.query.id)
            if(err){
                res.send("error");    
            }
            else{
                console.log(`Found student: ${docs.firstName}`);
                req.db.close();
                res.send(docs);    
            }
        });
    }
}

module.exports = new StudentController();
