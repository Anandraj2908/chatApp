import React, { useEffect, useState, useRef } from 'react'
import { databases, client } from '../appwriteConfig'
import { ID, Query, Role, Permission } from 'appwrite'
import { FiTrash } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

import "./style.scss"
import Header from '../components/Header';
import { userAuth } from '../utils/AuthContext';
const Room = () => {

  const databaseId= import.meta.env.VITE_DATABASE_ID;
  const collectionId = import.meta.env.VITE_COLLECTION_ID

  const {user} = userAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  }
  ,[])
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id:user.$id,
      username:user.name,
      body:inputValue,

    }

    let permissions = [
      Permission.write(Role.user(user.$id))
    ]

    const response =await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      payload,
      permissions
    );
    setInputValue('')


    
  };
  
  //listMessages
  const [messages, setMessages] = useState([]);
  const getMessages = async () => {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [
        Query.orderDesc("$createdAt")
      ]
    );
    const filteredResponse = response.documents.map(doc => {
      const { $collectionId,$databaseId,...rest } = doc;
      return rest;
    });
    setMessages(filteredResponse)
  }

  //delete Message
  const deleteMessage = async (documentId) => {
    const response = databases.deleteDocument(
      databaseId,
      collectionId,
      documentId);
      console.log("Deleted", response)
      setMessages(prevState => messages.filter(message => message.$id !== documentId))
      
  }

  //realtime events
  useEffect(()=>{
    getMessages()
    const unsubscribe = client.subscribe([`databases.${databaseId}.collections.${collectionId}.documents`], response => {
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        setMessages(prevState => [response.payload,...prevState])
      }

      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        console.log('Deleted',response)
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
      }
    });

    return ()=>{
      unsubscribe()
    }
  },[])

 

  return (
    <div className='mainContainer' >
      <div className="header bg-slate-500 ">
        <Header/>
      </div>
      <div className="contentBody bg-slate-500 ">
        <div className="messages " >
          {
            messages.map((message)=>{
              if(message.$permissions.includes(`delete(\"user:${user.$id}\")`)){
                return(
                  <div className="messageItems rightMsg" key={message.$id}>
                    <div className="messageContent bg-slate-700">{message.body}<button className='deleteBtn' onClick={()=>{deleteMessage(message.$id)}} ><FiTrash /></button>
                    </div>
                  </div>
                )
              }
              else{
                return(
                  <div className="messageItems leftMsg" key={message.$id}>
                    <div className="messageUser">{message.username}</div>
                    <div className="messageContent bg-slate-700">{message.body}</div>
                  </div>
                )
              }
            })
          }
        </div>
        
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={ inputValue}
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
