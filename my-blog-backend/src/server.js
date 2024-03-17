import fs from 'fs';
import admin from 'firebase-admin';
import pkg from 'firebase-admin';
import express from 'express';
import {db, connectToDb} from './db.js';
import e from 'express';
import {fileURLToPath} from 'url';
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// use the same format to insert data to database, .insertMany
// the id will be generated
// you exist database by cntrl c

// let articlesInfo = [{
//     name: 'learn-react',
//     upvotes: 0,
//     comments: [],
// }, {
//     name: 'learn-node',
//     upvotes: 0,
//     comments: [],
// },{
//     name: 'mongodb',
//     upvotes: 0,
//     comments: [],
// }]
// it will create an express app
const { auth } = pkg;
const credentials = JSON.parse(

    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res) =>{
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
//adding a express middel way
app.use(async(req, res, next) => {
    //getting the authtoken
    const {authtoken} = req.headers;
    if(authtoken){
        try{
            // use firebase to get token and load its info
        req.user = await admin.auth().verifyIdToken(authtoken);
        }catch(e){
            return res.sendStatus(400);
        }
        
    }
    req.user = req.user || {};
    next();
    
})


app.get('/api/articles/:name', async(req, res) =>{

    const {name} = req.params;
    const {uid} = req.user;
   
    
    // articles  name of collection or table .find that single article
    const article = await db.collection('articles').findOne({name})
    
    if(article){
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        // send it back with json to make sure about format
        res.json(article);
    }else{
        res.sendStatus(404);
    }
   
    
});

app.use((req, res, next) => {
    if(req.user){
        next();

    }else{
        res.sendStatus(401);
    }
    
    
});


app.put('/api/articles/:name/upvote', async(req, res) => {

    const {name} = req.params;
    const {uid} = req.user;
    const article = await db.collection('articles').findOne({name})
    if(article){
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
        if(canUpvote){
            await db.collection('articles').updateOne({name}, {
                //increamet upvotes by 1
                $inc: {upvotes: 1},
                $push:{upvoteIds: uid}
            });
        }
   
        const updatedArticle = await db.collection('articles').findOne({name});
        res.json(updatedArticle);
    }else{
        res.send('That article doesn\'t exist');
    }
    
});

app.post('/api/articles/:name/comments', async(req, res) =>{

    const{name} = req.params;
    const{text} = req.body;
    const{email} = req.user;
    
    await db.collection('articles').updateOne({name}, {
      
        $push:{ comments: {postedBy: email, text}}
    });

    const article = await db.collection('articles').findOne({name});

    if(article){
       
       res.json(article);
    }else{
        res.send('The article kdoes\'t exist');
    }

});

const PORT = process.env.PORT || 8000;
// listen which port
// calling the function to get db object
connectToDb(() => {app.listen(PORT, () =>{
    console.log('Successfully connected to database!');
    console.log('Server is listening on port ' + PORT);
});
})









// get  is used to load information from server
// post is used to create some sort of new resource on the server
// put is used for updating data
// when you defind an end point you should be aware what type req
// middleware is a extra functionality that the server excute
// type of request, shpold keep track, callback fun request and respone
// this should be above endpoint
// it is telling exprss that if it recivice a request that has a json body it make that availbe
// for our app PUT /articles/learn-node/upvote
// app.post('/hello', (req, res) => {
//     res.send(`Hello ${req.body.name}!`);
// });
// //:name to indicates para and we can have more than one in the url
// app.get('/hello/:name', (req, res) =>{
//     const name = req.params.name;
//     res.send(`Hello ${name}!!`);
// })
// --save-dev is used to install the package where it doesnt effect other parts