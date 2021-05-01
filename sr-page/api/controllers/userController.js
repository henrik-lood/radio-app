const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../srdb.db"));

const login = (req, res) => {
  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };
  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }

    req.body.password = Encrypt.encrypt(req.body.password);
    if (userInDB.password === req.body.password) {
      delete userInDB.password;
      res.json({ success: "Login successfull", loggedInUser: userInDB });
      return;
    } else {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }
  });
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: "Logout Successfully" });
};

const register = (req, res) => {
  let userToRegister = req.body;

  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToRegister.email };
  db.get(query, params, (err, userExist) => {
    if (userExist) {
      res.status(400).json({ error: "User with that email already exists" });
      return;
    }else{
          userToRegister.password = Encrypt.encrypt(userToRegister.password);
      query = `INSERT INTO users (email, password) VALUES ($email, $password)`;
      params = {
        $email: userToRegister.email,
        $password: userToRegister.password,
      };

      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        }
        res.json({ success: "User register successfull", lastID: this.lastID });
      });
    }
  });
};

const saveFavouriteProgram = async (req, res) => {
  let favourite = req.body;
  let query = `SELECT * FROM favouritePrograms WHERE favouriteProgramId = $id`;
  params = {
    $id: favourite.programId,
  }
  db.get(query, params, (err, success) =>{
    if(!success){
      query = `INSERT INTO favouritePrograms (favouriteProgramId) VALUES ($id)`;
      params = {
        $id: favourite.programId,
      }
      db.run(query, params, function(err, success){
      })
    }
    query = `INSERT INTO usersXfavouritePrograms (userId, favouriteProgramId) VALUES ($userId, $favouriteProgramId)`;
    params = {
      $userId: favourite.userId,
      $favouriteProgramId: favourite.programId,
    }
    db.run(query, params, function(err, success) {
      if(err){
        res.status(400).json({error: "Could not save favourite..."})
        return;
      }else{
        res.json({success: "Fav program is saved"})
      }
    });
  })
}

const getFavouritePrograms = async (req, res) => {
  let query = "";
  query = `SELECT * FROM usersXfavouritePrograms WHERE userId = $userId`;
  params = {
    $userId: req.params.id,
  }
  db.all(query, params, function(err, success) {
    if(err){
      res.status(400).json({error: "Could not get favourite programs..."})
      return;
    }else{
      res.json({success: "Fav programs are fetched", success})
    }
  });
}

const saveFavouriteChannel = async (req, res) => {
  let favourite = req.body;
  let query = `SELECT * FROM favouriteChannels WHERE favouriteChannelId = $id`;
  params = {
    $id: favourite.channelId,
  }
  db.get(query, params, (err, success) =>{
    if(!success){
      query = `INSERT INTO favouriteChannels (favouriteChannelId) VALUES ($id)`;
      params = {
        $id: favourite.channelId,
      }
      db.run(query, params, function(err, success){
      })
    }
    query = `INSERT INTO usersXfavouriteChannels (userId, favouriteChannelId) VALUES ($userId, $favouriteChannelId)`;
    params = {
      $userId: favourite.userId,
      $favouriteChannelId: favourite.channelId,
    }
    db.run(query, params, function(err, success) {
      if(err){
        res.status(400).json({error: "Could not save favourite channel..."})
        return;
      }else{
        res.json({success: "Fav channel is saved"})
      }
    });
  })
}

const getFavouriteChannels = async (req, res) => {
  let query = "";
  query = `SELECT * FROM usersXfavouriteChannels WHERE userId = $userId`;
  params = {
    $userId: req.params.id,
  }

  db.all(query, params, function(err, success) {
    if(err){
      res.status(400).json({error: "Could not get favourite channels..."})
      return;
    }else{
      res.json({success: "Fav channels are fetched", success})
    }
  });
}

const getAllUsers = async (req, res) => {
  let query = "";
  query = `SELECT * FROM users`;
  db.all(query, [], (err, posts) => {
    if (posts.length > 0) {
      console.log("Runs after the query");
      res.json(posts);
    }
  });
};

const changeUsername = async (req, res) => {
  let query = "";
  query = `UPDATE users SET email = $email WHERE userId = $userId`;
  params = {
    $email: req.body.newEmail,
    $userId: req.body.userId,
  }

  db.all(query, params, function(err, success) {
    if(err){
      res.status(400).json({error: "Could not update email"})
      return;
    }else{
      res.json({success: "Email is no updated", success})
    }
  });
}

const deleteProgram = async (req, res) => {
  let query = `DELETE FROM usersXfavouritePrograms WHERE (favouriteProgramId, userId) = ($favouriteProgramId, $userId)`;
  let params = {
    $favouriteProgramId: req.body.programId,
    $userId: req.body.currentUserId,
  };

  db.all(query, params, function(err, success) {
    if(err){
      res.status(400).json({error: "Could not delete fav program"})
      return;
    }else{
      res.json({success: "Program has been deleted", success})
    }
  });
}

const deleteChannel = async (req, res) => {
  let query = `DELETE FROM usersXfavouriteChannels WHERE (favouriteChannelId, userId) = ($favouriteChannelId, $userId)`;
  let params = {
    $favouriteChannelId: req.body.channelId,
    $userId: req.body.currentUserId,
  };
  db.all(query, params, function(err, success) {
    if(err){
      res.status(400).json({error: "Could not delete fav channel"})
      return;
    }else{
      res.json({success: "Channel has been deleted", success})
    }
  });
}

module.exports = {
  login,
  logout,
  register,
  getAllUsers,
  saveFavouriteProgram,
  getFavouritePrograms,
  changeUsername,
  deleteProgram,
  saveFavouriteChannel,
  getFavouriteChannels,
  deleteChannel,
};