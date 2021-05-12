import {useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/Channel.module.css";

const Channel = (props) =>{
  const {id} = props.match.params;
  const {programs, getPrograms, channels, convertTimeStamp} = useContext(ChannelContext);
  const {setFavProgram, currentUserId} = useContext(UserContext);

  const [scheduleBool, setScheduleBool] = useState(false);
  const [btnText, setBtnText] = useState("Visa mig dagens sändingar")

  useEffect(() =>{
    getPrograms(id);    
  }, [])
  
  const changeView = () =>{
    setScheduleBool(!scheduleBool);
    renderPrograms();
  }

  useEffect(() =>{
    setBtnText(changeText(scheduleBool));
  }, [scheduleBool])

const changeText = (bool) =>{
  return (bool ? "Visa mig programmen" : "Visa mig dagens sändingar");
}

const favProgram = (id) =>{
  let idToSave = {
    userId: currentUserId,
    programId: id,
  }
  setFavProgram(idToSave);
}

const renderPrograms = () =>{
    if(programs && !scheduleBool){
      return (
        <div>
          <button className={styles.toggleBtn} onClick={() => changeView()}>{btnText}</button>
          <h3>Program på den här kanalen</h3>
          <hr></hr>
          <div className={styles.programContainer}>
          {programs.programs.programs.map((program, i) =>(
              <div key={i} className={styles.programCard}>
                <p className={styles.programName}>{program.name}</p>
                <p>{program.description}</p>
                <button onClick={() => favProgram(program.id)} className={styles.fav}>
                Spara som favorit
                </button>
              <hr></hr>
              </div>
          ))}
          </div>
        </div>
      )
    }else if (programs && scheduleBool){
        return(
          <div className={styles.schedule}>
            <button className={styles.toggleBtn} onClick={() => changeView()}>{btnText}</button>
            <h3>Dagens sändningar</h3>
            <hr></hr>
            <div className={`${styles.programContainer} ${styles.schedualContainer}`}>{programs.schedule.schedule.map((p, i) => (
              <div className={`${styles.programCard} ${styles.schedualCard}`} key={i}>
                <p className={styles.programName}>{p.title}</p>
                <p>{p.description}</p>
                <p className={styles.time}>Sänds: {convertTimeStamp(p.starttimeutc)}</p>
                <hr></hr>
              </div>
            ))}</div>
          </div>
        )
    }
}

const channelToFind = channels.channels.find(channel => channel.id == id);

return(
  <div>
    <div className={styles.imageContainer}>
    <img src={channelToFind.image} className={styles.img} alt={channelToFind.name}/>
    </div>
    {programs && renderPrograms()}
  </div>
)
}

export default Channel;