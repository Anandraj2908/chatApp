import React, { useEffect, useState, useRef } from 'react'
import { databases } from '../appwriteConfig'
import { ID } from 'appwrite'

import "./style.scss"
const Room = () => {

  

  //form
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body:inputValue
    }

    const response =await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      ID.unique(),
      payload
    );

    console.log('Form submitted', response);
    setMessages(prevState => [...messages,response])
    setInputValue('')
  };
  


  //addMessages


  //listMessages
  const [messages, setMessages] = useState([]);
  const getMessages = async () => {
    const response = await databases.listDocuments(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID);
    const filteredResponse = response.documents.map(doc => {
      const { $collectionId,$databaseId,...rest } = doc;
      return rest;
    });
    setMessages(filteredResponse)
  }
  useEffect(()=>{
    getMessages()
  },[])
    

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
    
  
    
  //rightMsg or leftMsg
    // <div className="messageItems leftMsg">
    //   <div className="messageUser">anand</div>
    //   <div className="messageContent bg-slate-700">Hello googler</div>
    // </div>

  return (
    <div className='mainContainer' >
      <div className="header bg-slate-500 ">
        <div className='bg-slate-700 logo'>Logo</div>
      </div>
      <div className="contentBody bg-slate-500 ">
        <div className="messages " ref={messagesEndRef}>
              {messages.map((message)=>(
                <div className="messageItems leftMsg" key={message.$id}>
                <div className="messageUser">{message.username}</div>
                <div className="messageContent bg-slate-700">{message.body}</div>
              </div>
              ))}
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
