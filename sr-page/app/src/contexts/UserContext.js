import React, {createContext, useState, useEffect} from "react";

export const UserContext = createContext();

const UserContextProvider = (props) =>{

  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  const [createdUsername, setCreatedUsername] = useState("");
  const [createdPassword, setCreatedPassword] = useState("");
  const [favProgram, setFavProgram] = useState(null);
  const [usersPrograms, setUsersPrograms] = useState(null);
  const [newUsername, setNewUsername] = useState(null);
  const [usersChannels, setUsersChannels] = useState(null);

  const getUsers = async () =>{
    let usersToGet = await fetch('/api/v1/users');
    usersToGet = await usersToGet.json();
    setUsers(usersToGet)
  }

  useEffect(() =>{
    getUsers();
  }, [])

  useEffect(() =>{
    if(favProgram){
      setFavProgramToUser();
    }
  }, [favProgram])

  //login
  const onChangeCurrentUsername = (e) => {
    setCurrentUsername(e.target.value);
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const login = async (e) =>{
    e.preventDefault();
    let userInput ={
      email: currentUsername,
      password: currentPassword
    }

    let result = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    result = await result.json();
    if(result.success){
      console.log(result.loggedInUser.userId);
      setCurrentUserId(result.loggedInUser.userId)
    }else{
      console.log(result.error);
    }
    setCurrentUser(currentUsername);
  }

  //sign up
  const onChangeCreatedUsername = (e) => {
    setCreatedUsername(e.target.value);
  };

  const onChangeCreatedPassword = (e) => {
    setCreatedPassword(e.target.value);
  };

  const signUp = async (e) =>{
    e.preventDefault();
    let newUser ={
      email: createdUsername,
      password: createdPassword
    }

    let result = await fetch("/api/v1/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    result = await result.json();
    if(result.success){
      console.log(result.success);
    }else{
      console.log(result.error);
    }
  }

  const logout = async () =>{
    setCurrentUser(null);
    setCurrentUsername("");
    setCurrentPassword("");
    setCurrentUserId(null);
  }

  //change username
  const onChangeNewUsername = (e) =>{
    setNewUsername(e.target.value);
  }

  const changeEmail = async (e) =>{
    e.preventDefault();

    let newUsernameContainer ={
      userId: currentUserId, 
      newEmail: newUsername,
    }

    let result = await fetch("/api/v1/users/changeusername", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUsernameContainer),
    });
    result = await result.json();
    if(result.success){
      console.log(result.success);
    }else{
      console.log(result.error);
    }
  }

  //set and get favourites
  const setFavProgramToUser = async (req, res) => {
    let result = await fetch("/api/v1/users/savefavouriteprogram", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(favProgram),
    });
    result = await result.json();
    if(result.success){
      console.log(result.success);
    }else{
      console.log(result.error);
    }
  }

  const getFavouritePrograms = async (id) =>{
    let programsToGet = await fetch(`/api/v1/users/programs/${id}`);
    programsToGet = await programsToGet.json();
    setUsersPrograms(programsToGet.success)

    if (programsToGet.success){
      console.log(programsToGet.success);
    }else if(programsToGet.error){
      console.log(programsToGet.error);
    }
  }

  const setFavouriteChannelToUser = async (id) =>{
    let saveChannel = {
      channelId: id,
      userId: currentUserId,
    }

    let result = await fetch("/api/v1/users/savefavouritechannel", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(saveChannel),
    });
    result = await result.json();
    if(result.success){
      console.log(result.success);
    }else{
      console.log(result.error);
    }
  }

  const getFavouriteChannels = async (id) =>{
    let channelsToGet = await fetch(`/api/v1/users/channels/${id}`);
    channelsToGet = await channelsToGet.json();
    setUsersChannels(channelsToGet.success)

    if (channelsToGet.success){
      console.log(channelsToGet.success);
    }else if(channelsToGet.error){
      console.log(channelsToGet.error);
    }
  }

  //Delete fav program
  const deleteProgram = async (programId, currentUserId) =>{
    let deleteObj = {
      programId: programId,
      currentUserId: currentUserId,
    }
    let result = await fetch(`/api/v1/users/deleteprogram`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(deleteObj),
    });

    result = await result.json();
    if(result.success){
      console.log(result.success);
    }else{
      console.log(result.error);
    }
  }

  const deleteChannel = async (channelId, currentUserId) =>{
    let deleteObj = {
      channelId: channelId,
      currentUserId: currentUserId,
    }
    let result = await fetch(`/api/v1/users/deletechannel`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(deleteObj),
    });

    result = await result.json();
    if(result.success){
      console.log(result.success);
    }else{
      console.log(result.error);
    }
  }

  const values = {
    users,
    setCurrentUsername,
    currentUsername,
    setCurrentPassword,
    currentPassword,
    onChangeCurrentUsername,
    onChangeCurrentPassword,
    login,
    signUp,
    createdUsername,
    createdPassword,
    onChangeCreatedUsername,
    onChangeCreatedPassword,
    setFavProgram,
    currentUserId,
    getFavouritePrograms,
    usersPrograms,
    newUsername,
    setNewUsername,
    onChangeNewUsername,
    changeEmail,
    deleteProgram,
    setFavouriteChannelToUser,
    getFavouriteChannels,
    usersChannels,
    deleteChannel,
    setCurrentUserId,
    logout,
  };

  return(
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  )
}

export default UserContextProvider;
