import {useContext, useEffect, useState} from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import {UserContext} from "../contexts/UserContext";
import styles from "../styles/MyPage.module.css";

const MyPage = () =>{

  const { currentUserId, getFavouritePrograms, getFavouriteChannels, usersPrograms, currentUsername, onChangeNewUsername, changeEmail, deleteProgram, usersChannels, deleteChannel} = useContext(UserContext);

  const {getAllPrograms, allPrograms, channels, getPrograms, programs, convertTimeStamp } = useContext(ChannelContext);

  const [programArray, setProgramArray] = useState([]);
  const [channelArray, setChannelArray] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState("Välj en kanals schema att visas här.");
  const [latestClickedId, setLatestClickedId] = useState();

  useEffect(() =>{
    if(currentUserId){
      getFavouritePrograms(currentUserId);
      getFavouriteChannels(currentUserId);
      getAllPrograms();
    }
  }, [currentUserId]);
  
  useEffect(() => {
    if(allPrograms){
    let newArray = [];
    if(currentUserId && allPrograms && usersPrograms){
      usersPrograms.map((favProgram, i) =>{
        allPrograms.forEach(program => {
          if(favProgram.favouriteProgramId === program.id){
            newArray.push(program);
          }
        });
      })
      }
      setProgramArray(newArray);
    }
  }, [allPrograms])


  useEffect(() => {
    if(usersChannels){
      let newArray = [];
      if(currentUserId && channels && usersChannels){
        usersChannels.map((favChannel, i) =>{
          channels.channels.forEach(channel => {
            if(favChannel.favouriteChannelId === channel.id){
              newArray.push(channel);
            }
          });
        })
      }
      setChannelArray(newArray);
    }
  }, [usersChannels])

  const renderFavPrograms = () =>{
    return(
      <div>
        {programArray.map((program, i) =>(
          <div key={i}>
            <div className={styles.programName}>{program.name}</div>
            <div className={styles.btnContainerPrograms}>
            <button className={styles.btn} onClick={(e) => deleteProgram(program.id, currentUserId)}>Ta bort favorit</button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    if(programs && latestClickedId){
      renderSchedule(latestClickedId);
    }
  }, [programs])

  const renderSchedule = () => {
    setCurrentSchedule(
      <div>{programs.schedule.schedule.map((p, i) => (
        <div key={i}>
          <p className={styles.programName}>{p.title}</p>
          <p>{p.description}</p>
          <p className={styles.time}>Sänds: {convertTimeStamp(p.starttimeutc)}</p>
          <hr></hr>
        </div>
      ))}</div>
    )
  }

  const dropdown = (id) =>{
    getPrograms(id);
    setLatestClickedId(id);
  }

  const renderFavChannels = () =>{
    return(
      <div>
        {channelArray.map((channel, i) =>(
          <div key={i}>
            <div className={styles.channelName}>{channel.name}</div>
            <div className={styles.btnContainer}>
              <button className={styles.btn} onClick={(e) => dropdown(channel.id)}>Visa schema</button>
              <button className={styles.btn} onClick={(e) => deleteChannel(channel.id, currentUserId)}>Ta bort favorit</button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const closeModal = () =>{
    setCurrentSchedule("Välj en kanals schema att visas här.");
  }

  const mailForm = () =>{
    return(
      <form onSubmit={(e) => changeEmail(e)}>
        <p className={styles.formText}>Ändra din email</p>
        <div className={styles.form}>
          <input
          placeholder={currentUsername}
          type="email"
          onChange={onChangeNewUsername}
          className={styles.input}
          ></input>
          <button className={styles.mailBtn}
          type="submit">Ändra min email
          </button>
        </div>
      </form>
    )
  }

  return(
    <div className={styles.bg}>
    {(() => {
      if (currentUserId && (channelArray.length !== 0 || programArray.length !== 0)) {
        return(
          <div className={styles.masterContainer}>
            <div className={styles.modalContainer}>
              <button onClick={(e) => closeModal(e)} className={styles.closeBtn}>X</button>
              <div className={`${styles.modal}`}>
                {currentSchedule}
              </div>
            </div>
            <p className={styles.header}>Mina favoritkanaler</p>
            {channelArray && renderFavChannels()}
            <hr></hr>
            <p className={styles.header}>Mina favoritprogram</p>
            {programArray && renderFavPrograms()}
            <hr></hr>
            <div>
              {mailForm()}
            </div>
          </div>
        )
      } else if(currentUserId && channelArray.length === 0 && programArray.length === 0){
        return (
            <div>
              <div className={styles.header}>Här var det tomt! Lägg till favoritkanaler och -program för att se dem här!</div>
              {mailForm()}
            </div>
        )
      }else {
        return <div className={styles.header}>Ojdå! Du verkar inte vara inloggad!</div>
      }
    })()}
    </div>
  )
}

export default MyPage;