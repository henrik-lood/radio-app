const express = require("express");
const port = 3001;
const prefixRoute = "/api/v1";
const userRoutes = require("./routes/userRoutes");
const channelRoutes = require("./routes/channelRoutes");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, (err) =>{
  if(err){
    console.log("Server could not start, server sucks")
  }else{
    console.log(`Server started. Listening to port ${port}`);
  }
})

app.use(express.json());
app.use(prefixRoute + "/users", userRoutes)
app.use(prefixRoute + "/channels", channelRoutes)
