import React, { useEffect, useState, useRef } from 'react'
import { databases } from '../appwriteConfig'

import "./style.scss"
const Room = () => {

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



  const [messages, setMessages] = useState(null);
  
    const getMessages = async () => {
      const response = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID);
      const filteredResponse = response.documents.map(doc => {
        const { $collectionId,$databaseId,$id,...rest } = doc;
        return rest;
    });
      
      setMessages(filteredResponse)
    }
    
    useEffect(()=>{
      getMessages()
    },[])
    //rightMsg or leftMsg

    //scrool to bottom
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }
    };
  
    useEffect(() => {
      scrollToBottom();
    }, []);
  
    
    

  return (
    <div className='mainContainer' >
      <div className="header bg-slate-500 ">
        <div className='bg-slate-700 logo'>Logo</div>
      </div>
      <div className="contentBody bg-slate-500 ">
        <div className="messages " ref={messagesEndRef}>
              
              <div className="messageItems rightMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              <div className="messageItems leftMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              <div className="messageItems leftMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              <div className="messageItems leftMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              <div className="messageItems rightMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              <div className="messageItems leftMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              <div className="messageItems leftMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              <div className="messageItems leftMsg">
                <div className="messageUser">anand</div>
                <div className="messageContent bg-slate-700">Hello googler</div>
              </div>
              
              
              
          
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
            <button type="submit"  className="submit-button">
             ↩
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Room
