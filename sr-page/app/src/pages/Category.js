import {useContext, useEffect} from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import styles from "../styles/Categories.module.css";

const Category = (props) =>{
  const {id} = props.match.params;
  const {selectedCategory, getSelectedProgramsForCategory} = useContext(ChannelContext);

useEffect(() =>{
  getSelectedProgramsForCategory(id);
}, [])

  const renderCategories = () =>{
      return (
        <div className={`${styles.category}`}>
          {selectedCategory.programs.map((program, i) =>(
            <div className={styles.programCard} key={i}>
              <h2>{program.name}</h2>
              <p>Sänds i {program.channel.name}</p>
              <p className={styles.about}>{program.description}</p>
              <hr></hr>
            </div>
          ))}
        </div>
      )
}

return(
  <div>
    <hr></hr>
    {selectedCategory && renderCategories()}
  </div>
)
}

export default Category;