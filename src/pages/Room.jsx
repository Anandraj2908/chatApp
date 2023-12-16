import React, { useEffect } from 'react'
import { databases } from '../appwriteConfig'

import "./style.scss"
const Room = () => {

    const getMessages = async () => {
      const response = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID);
      const filteredResponse = response.documents.map(doc => {
        const { $collectionId,$databaseId,$id,...rest } = doc;
        return rest;
    });
      console.log(filteredResponse)
    }

    useEffect(()=>{
      getMessages()
    },[])

  return (
    <div className='mainContainer' >
      <div className="header bg-slate-500 ">
        <div className='bg-slate-700 logo'>Logo</div>
      </div>
      <div className="contentBody bg-slate-500 ">
        <div className="messages bg-slate-700 ">
          Hello
        </div>
        <div className="input bg-slate-700 ">
          INPUT
        </div>
      </div>
    </div>
  )
}

export default Room
