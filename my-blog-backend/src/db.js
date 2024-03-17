import {MongoClient} from 'mongodb';
let db;

async function connectToDb(cb){
    // creating connection to database
    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();

    // connect to desire db
    db = client.db('react-blog-db');
    cb();

}

//whenever you try to export an object use this syntax
export{
    db,
    connectToDb,
};