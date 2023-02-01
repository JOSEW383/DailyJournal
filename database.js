const mongoose = require('mongoose');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const postSchema = new mongoose.Schema({
    title: String,
    body: String
});
const mainDataSchema = new mongoose.Schema({
  homeStartingContent: String,
  aboutContent: String,
  contactContent: String
});


const Post = mongoose.model("Post", postSchema);
module.exports.Post = Post;
const MainData = mongoose.model("MainData", mainDataSchema);


module.exports.main = main;
async function main() {
  mongoose.set('strictQuery', true);

  const mongoURL = 'mongodb+srv://Admin:'+process.env.MONGODB_ATLAS_SECRET+'@'+process.env.MONGODB_ATLAS_URL+'/dailyJournalDB'
  await mongoose.connect(mongoURL); // Cloud
  // await mongoose.connect('mongodb://127.0.0.1:27017/dailyJournalDB'); // Local
  
  console.log("MongoDB conected");
  initDatabase();
}


function initDatabase(){ 
    const mainData = new MainData({
      homeStartingContent: homeStartingContent,
      aboutContent: aboutContent,
      contactContent: contactContent,
    });

    const post1 = new Post({
      title: "Post 1",
      body: "This is the body of the post 1"
    });
    const post2 = new Post({
      title: "Post 2",
      body: "Ut convallis, sapien sit amet maximus tristique, dui metus dignissim elit, aliquet faucibus odio erat ac tortor. Donec ac magna ac tellus congue suscipit. Donec ac ante bibendum, mattis sem vitae, consectetur tortor. Morbi nec mauris in nisl mattis pharetra nec ac lorem. Sed vel nunc justo. Donec consequat faucibus nisi, et luctus massa luctus eget. Aliquam metus felis, faucibus eu ex sollicitudin, malesuada dignissim diam."
    });
   
    MainData.find({},function(err, data){
      if(err){
        console.log("Error: "+err)
      }else{
        if(!data || data.length === 0){
          mainData.save();
          post1.save();
          post2.save();
          console.log("Database initied");
        }
      }
    });
}


module.exports.deletePost = deletePost;
function deletePost(postId){
  console.log(postId)

  Post.deleteOne({_id: postId}, function(err) {
    if(err){
      console.log("Error: "+err);
    }else{
      console.log("Post deleted");
    }
  });
}


module.exports.createPost = createPost;
function createPost(postName, postBody){
  const post = new Post({
    title: postName,
    body: postBody
  })
  post.save();
}

module.exports.getHomeStartingContent = getHomeStartingContent;
function getHomeStartingContent(){
  return new Promise((resolve, reject) => {
    MainData.findOne({}, function(err, mainData) {
      if (err) reject(err);
      resolve(mainData.homeStartingContent);
    });
  });
}

module.exports.getAboutContent = getAboutContent;
function getAboutContent(){
  return new Promise((resolve, reject) => {
    MainData.findOne({}, function(err, mainData) {
      if (err) reject(err);
      resolve(mainData.aboutContent);
    });
  });
}

module.exports.getContactContent = getContactContent;
function getContactContent(){
  return new Promise((resolve, reject) => {
    MainData.findOne({}, function(err, mainData) {
      if (err) reject(err);
      resolve(mainData.contactContent);
    });
  });
}

module.exports.getPosts = getPosts;
function getPosts(){
  return new Promise((resolve, reject) => {
    Post.find({}, function(err, posts) {
      if (err) reject(err);
      resolve(posts);
    });
  });
}

module.exports.getPost = getPost;
function getPost(postId){
  return new Promise((resolve, reject) => {
    Post.findOne({_id: postId},
      function(err, post) {
        if (err) reject(err);
        resolve(post);
    });
  });
}