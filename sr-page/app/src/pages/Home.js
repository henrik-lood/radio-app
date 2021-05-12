import {useContext, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Home.module.css";
import {useHistory} from "react-router-dom";

const Home = () =>{
  const {channels, categories} = useContext(ChannelContext);
  const {setFavouriteChannelToUser} = useContext(UserContext);

  const history = useHistory();

  const [toggleVal, setToggleVal] = useState(false);

  const [btnText, setBtnText] = useState("Visa mig kategorier");
  const [viewText, setViewText] = useState("Kanaler");

  const toggle = () =>{
      if(toggleVal === false){
        setBtnText("Visa mig kanaler");
        setViewText("Kategorier")
        setToggleVal(true)
      }else{
        setBtnText("Visa mig kategorier");
        setViewText("Kanaler")
        setToggleVal(false)
      }
  }
  
  const goToChannel = (id) =>{
    history.push(`/channel/programs/${id}`);
  }

  const goToCat = (id) =>{
    history.push(`/channel/categories/${id}`);
  }

  const renderByToggle = () => {
    if(!toggleVal){
    return(
        <div className={styles.channelContainer}>
          {channels && channels.channels.map((channel, i) => (
            <div key={i} className={styles.channelCard}>
              <div onClick={() => goToChannel(channel.id)} key={channel.id}>
                <img className={`${styles.imgTag}`} src={channel.image} alt={`${channel.name} logga`}/>
                <p className={styles.name}>{channel.name}</p>
              </div>
              <button className={styles.favChannelBtn} onClick={(e) => setFavouriteChannelToUser(channel.id)}>Spara som favorit</button>
            </div>
          ))}
        </div>
    )
    }else{
      return(
          <div className={styles.categoryContainer}>
            {categories && categories.programcategories.map((category) => (
              <div key={category.id} onClick={() => goToCat(category.id)}className={styles.categoriesCard}>
                <p className={styles.categories}>{category.name}</p>
              </div>
            ))}
          </div>
      )
    }
  }

  return(
    <div className={styles.home}>
      <button className={styles.toggleBtn} onClick={(e) => toggle(e)} >{btnText}</button>
      <hr></hr>
      <h2 className={styles.viewText}>{viewText}</h2>
      {channels && renderByToggle()}
    </div>
  )
}

export default Home;