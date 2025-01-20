/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import tw, { css } from "twin.macro";
/* eslint-enable*/
export default function Chat() {
   const [name, setName] = useState('')
   const [message, setMessage] = useState('')
   const [messageList, setMessageList] = useState([])
   const socket = socketIOClient('http://localhost:5000')


   const onSubmit = (e) => {
      e.preventDefault()
      socket.emit('message', `${name}: ${message}`)
      setMessage('')
   }

   useEffect(() => {
      socket.emit('connection', (e) => {
         console.log('Socket 接続成功', e)
         socket.on('message', (data) => {
            console.log('message', data)
            setMessageList([...messageList, data])
         })
         socket.on('count', (data) => {
            console.log('count', data)
         })
      })
      socket.on('disconnect', (e) => {
         console.log('Socket 接続終了', e) 
      })
   },[socket])
   return (
      <>
         {messageList.length === 0 && <p>メッセージはありません</p>}
         {messageList.length !== 0 && 
            <>
               {messageList.map((message, index) => {
                     return <p key={index}>{message}</p>
               })}
            </>
         }
         <form className='flex gap-3' onSubmit={(e) => {onSubmit(e)}}>
            <input
               type="text"
               className='w-1/5 border border-black rounded-md'
               onChange={(e) => {setName(e.target.value)}}
               value={name}
               placeholder='名前'
            />
            <input
               type="text"
               className='w-1/3 border border-black rounded-md'
               onChange={(e) => {setMessage(e.target.value)}}
               value={message}
               placeholder='メッセージ'
            />
            <button
               type='button'
               className='w-20 h-10 bg-blue-500 text-white rounded-md'
               onClick={(e) => {
                  onSubmit(e)
               }}
            >
               送信
            </button>
         </form>
      </>
   )
}