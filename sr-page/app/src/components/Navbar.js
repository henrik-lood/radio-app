import styles from "../styles/Navbar.module.css"
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {useContext, useEffect, useState} from "react";

const Navbar = () =>{
  const {currentUserId, logout} = useContext(UserContext);
  const [loggedInText, setLoggedInText] = useState("Login");
  
  useEffect(() =>{
    checkLoggedIn();
  }, [currentUserId])

  const checkLoggedIn = () =>{
    if(currentUserId){
      setLoggedInText("Logout")
    }else{
      setLoggedInText("Login")
    }
  }

  return(
    <nav className={styles.navbar}>
      <Link className={styles.noDec} to="/"><h1>Sveriges Radio</h1></Link>
      <ul>
      {(() => {
            if (currentUserId) {
              return(
                <li><Link className={`${styles.noDec} ${styles.textElement}`} to="/" onClick={() => logout()}>{loggedInText}</Link></li>
                )
              }else{
                return(
                <li><Link className={`${styles.noDec} ${styles.textElement}`} to="/signIn">{loggedInText}</Link></li>
              )
            }
      })()}
        <li><Link className={`${styles.noDec} ${styles.textElement}`} to="/myPage">Mina sidor</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
