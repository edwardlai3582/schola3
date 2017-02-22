const mongodb = require('mongodb');
const { MongoClient, ObjectID } = require('mongodb');
const url = 'mongodb://schola:schola123@ds033096.mlab.com:33096/schola1';

class ClassController {
    constructor(){

    }

    getMonogoDB(req, res, next){
        MongoClient.connect(url, (err, db)=>{
            req.db = db;
            next();
        });
    }

    //get by name
    get(req, res){
        const collection = req.db.collection('classes');
        
        collection.aggregate([
            {
              $match: {
                className: req.query.name
              }
            },
            // Unwind the source
            { "$unwind": "$student_ids" },
            // Do the lookup matching
            { "$lookup": {
               "from": "students",
               "localField": "student_ids",
               "foreignField": "sid",
               "as": "studentObjects"
            }},
            // Unwind the result arrays ( likely one or none )
            { "$unwind": "$studentObjects" },
            // Group back to arrays
            { "$group": {
                "_id": "$_id",
                "studentObjects": { "$push": "$studentObjects" }
            }}
        ], (err, docs) => {
            if (err) {
                res.send("error");
            }
            else {
                req.db.close();
                res.send(docs);    
            }  
        });
    }
}

module.exports = new ClassController();
