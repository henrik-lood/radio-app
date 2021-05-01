import React, {createContext, useState, useEffect} from "react";
export const ChannelContext = createContext();

const ChannelContextProvider = (props) =>{

  const [channels, setChannels] = useState(null);
  const [categories, setCategories] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allPrograms, setAllPrograms] = useState(null);


  const getChannels = async () =>{
    let channelsToGet = await fetch('/api/v1/channels');
    channelsToGet = await channelsToGet.json();
    setChannels(channelsToGet);
  }

  const getCategories = async () =>{
    let categoriesToGet = await fetch('/api/v1/channels/categories');
    categoriesToGet = await categoriesToGet.json();
    setCategories(categoriesToGet);
  }

  //programs for specific channel
  const getPrograms = async (id) =>{
    let programsToGet = await fetch(`/api/v1/channels/programs/${id}`);
    programsToGet = await programsToGet.json();
    setPrograms(programsToGet);
  }

  //get all programs for all channels
  const getAllPrograms = async () =>{
    let allProgramsToGet = await fetch(`/api/v1/channels/programs`);
    allProgramsToGet = await allProgramsToGet.json();
    setAllPrograms(allProgramsToGet.programs);
  }

  // categories
  const getSelectedProgramsForCategory = async (id) =>{
    let selectedCategoryToGet = await fetch(`/api/v1/channels/categories/${id}`);
    selectedCategoryToGet = await selectedCategoryToGet.json();
    setSelectedCategory(selectedCategoryToGet);
  }

  const convertTimeStamp = (starttimeutc) => {
    return new Date(
      parseInt(starttimeutc.replace(/[\/\(\)date]/gi, ""))
    ).toLocaleString();
  };

  useEffect(() =>{
    getChannels();
    getCategories();
  }, [])

  const values = {
    channels,
    categories,
    programs,
    getPrograms,
    selectedCategory,
    getSelectedProgramsForCategory,
    getAllPrograms,
    allPrograms,
    convertTimeStamp,
    setPrograms,
  };

  return(
    <ChannelContext.Provider value={values}>{props.children}</ChannelContext.Provider>
  )
}

export default ChannelContextProvider;
