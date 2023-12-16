import React, { useEffect } from 'react'
import { databases } from '../appwriteConfig'

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
    <div className='container' >
      <div className="mx-32 mt-5 mb-10 bg-slate-500 rounded-lg p-3 flex justify-center ">
        <div className='bg-slate-700 p-2 rounded-lg'>Logo</div>
      </div>
      <div className="mx-32 p-2 bg-slate-500 rounded-lg">
        <div className="messages bg-slate-700 my-3 mx-2 p-2 rounded-lg h-96">
          Hello
        </div>
        <div className="input bg-slate-700 my-3 mx-2 p-2 rounded-lg">
          INPUT
        </div>
      </div>
    </div>
  )
}

export default Room
