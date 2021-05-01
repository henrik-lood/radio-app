import styles from "../styles/SignIn.module.css";
import {useContext, useEffect, useState} from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

const SignIn = () =>{
  const {
    currentUsername,
    currentPassword,
    onChangeCurrentUsername,
    onChangeCurrentPassword,
    login,
    signUp,
    createdUsername,
    createdPassword,
    onChangeCreatedUsername,
    onChangeCreatedPassword,
  } = useContext(UserContext);

  const [showSignUp, setShowSignUp] = useState(false);
  const [buttonText, setButtonText] = useState(null);
  const {currentUserId} = useContext(UserContext);

  const history = useHistory();

  useEffect(() =>{
    if(currentUserId){
      history.push({pathname: `/`});
    }
  }, [currentUserId])

  const toLogin = () =>{
    return(
      <form onSubmit={(e) => login(e)}>
        <div className={styles.formContainer}>
          <input
          type="email"
          value={currentUsername}
          onChange={onChangeCurrentUsername}
          placeholder="Email"></input>
          <input
          value={currentPassword}
          onChange={onChangeCurrentPassword}
          placeholder="Lösenord"
          type="password"
          required></input>
        </div>
        <button className={styles.submitBtn} type="submit">Logga in</button>
      </form>
    )
  }

  const toSignUp = () =>{
    return(
      <form onSubmit={(e) => signUp(e)}>
        <div className={styles.formContainer}>
          <input
          value={createdUsername}
          onChange={onChangeCreatedUsername}
          placeholder="Email"></input>
          <input
          value={createdPassword}
          onChange={onChangeCreatedPassword}
          placeholder="Lösenord"
          type="password"
          required></input>
        </div>
        <button className={styles.submitBtn} type="submit">Registrera mig</button>
      </form>
    )
  }

  useEffect(() =>{
    if(buttonText === "Gå till sida för att skapa konto"){
      setButtonText("Gå till sida för inloggning")
    }else{
      setButtonText("Gå till sida för att skapa konto")
    }
  }, [showSignUp])

  const changeBoolean = () =>{
    setShowSignUp(!showSignUp);
  }

  return(
    <div className={styles.signIn}>
      {showSignUp ? toSignUp() : toLogin()}
      <button className={styles.toggleBtn} onClick={(e) => changeBoolean(e)}>{buttonText}</button>
    </div>
  )
}

export default SignIn;
