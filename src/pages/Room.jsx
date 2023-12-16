import React, { useEffect, useState } from 'react'
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

    //form
    
      const [inputValue, setInputValue] = useState('');
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data
        console.log('Form submitted with value:', inputValue);
      };
    
      const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };

  return (
    <div className='mainContainer' >
      <div className="header bg-slate-500 ">
        <div className='bg-slate-700 logo'>Logo</div>
      </div>
      <div className="contentBody bg-slate-500 ">
        <div className="messages bg-slate-700 ">
          <div className="messageItems bg-slate-500">Message</div>
        </div>
        
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter text here"
              className="input-field"
            />
            <button type="submit" className="submit-button">
             ↩
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Room
