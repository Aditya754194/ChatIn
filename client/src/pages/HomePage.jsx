import { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

  const {selectedUser} = useContext(ChatContext)    

  return (
    <div className='border w-full h-screen p-2 sm:px-[8%] sm:py-[3%] md:px-[10%] md:py-[4%] lg:px-[12%] lg:py-[5%] xl:px-[15%] xl:py-[5%]'>
        <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-xl sm:rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
            <Sidebar/>
            <ChatContainer/>
            <RightSidebar/>
        </div>
    </div>
  )
}

export default HomePage