import  { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {


  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [msgImages, setmsgImages] = useState([])

  //get all the images from the messages and set them to state
  useEffect(()=>{
    setmsgImages(
      messages.filter(msg => msg.image).map(msg=>msg.image)
    )
  },[messages])



  return selectedUser && (
    <div className={`bg-slate-800/80 text-white w-full relative p-3 sm:p-4 lg:p-5 ${selectedUser ? "max-md:hidden" : ""}`}>

      <div className='pt-8 sm:pt-12 lg:pt-16 flex flex-col items-center gap-2 sm:gap-3 text-xs sm:text-sm font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-16 sm:w-18 lg:w-20 xl:w-24 aspect-[1/1] rounded-full object-cover'/>
        <h1 className='px-4 sm:px-6 lg:px-10 text-lg sm:text-xl lg:text-2xl font-medium mx-auto flex items-center gap-2 text-center'>
          {onlineUsers.includes(selectedUser._id)&&<p className='w-2 h-2 rounded-full bg-green-500 flex-shrink-0'></p>}
          <span className='truncate'>{selectedUser.fullName}</span>
        </h1>
        <p className='px-4 sm:px-6 lg:px-10 mx-auto text-center text-gray-300 text-xs sm:text-sm leading-relaxed'>{selectedUser.bio}</p>
      </div>
      <hr className='border-[#ffffff50] my-3 sm:my-4 lg:my-5' />
      <div className='px-2 sm:px-3 lg:px-5 text-xs sm:text-sm'>
        <p className='mb-2 sm:mb-3 font-medium text-gray-200'>Media</p>
        <div className='max-h-[150px] sm:max-h-[180px] lg:max-h-[200px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 opacity-80'>
          {msgImages.length > 0 ? (
            msgImages.map((url, index)=>(
              <div key={index} onClick={()=>window.open(url)}
              className='cursor-pointer rounded hover:opacity-100 transition-opacity'>
                <img src={url} alt="" className='w-full h-16 sm:h-18 lg:h-20 rounded-md object-cover'/>
              </div>
            ))
          ) : (
            <div className='col-span-2 sm:col-span-3 lg:col-span-2 xl:col-span-3 text-center text-gray-400 py-4'>
              <p className='text-xs sm:text-sm'>No media shared yet</p>
            </div>
          )}
        </div>
      </div>
      <button onClick={()=>logout()} className='absolute bottom-3 sm:bottom-4 lg:bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-xs sm:text-sm font-light py-2 sm:py-3 px-12 sm:px-16 lg:px-20 rounded-full cursor-pointer hover:from-purple-500 hover:to-violet-700 transition-all duration-200'>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar