require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const database = require(__dirname+'/database.js');
const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Init database
database.main().catch(err => console.log(err));

app.listen(port, function() {
  console.log("Server listening at http://localhost:"+port);
});

app.get('/', async (req, res) => {
  res.render('home', {homeStartingContent: await database.getHomeStartingContent(), posts:await database.getPosts()});
});

app.get('/about', async (req, res) => {
  res.render('about', {aboutContent: await database.getAboutContent()});
});

app.get('/contact', async (req, res) => {
  res.render('contact', {contactContent: await database.getContactContent()});
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const postTitle= String(req.body.composeTitle);
  const postBody= String(req.body.composeText);

  // Disabled for online database
  // database.createPost(postTitle, postBody);

  res.redirect("/");
});

app.get('/post/:postId', async (req, res) => {
  const postId = req.params.postId
  const post = await database.getPost(postId);
  if(post != null){
    res.render('post', {post:post});
  }else{
    console.log("No Math!");
  }
});