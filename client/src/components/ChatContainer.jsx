import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef(null);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Handle sending a message
  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (input.trim() === "" || isSending) return;
    
    setIsSending(true);
    try {
      await sendMessage({ text: input.trim() });
      setInput("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  }, [input, isSending, sendMessage]);

  // Handle sending an image
  const handleSendImage = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPEG)");
      return;
    }

    setIsSending(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await sendMessage({ image: reader.result });
        e.target.value = "";
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to send image");
    } finally {
      setIsSending(false);
    }
  }, [sendMessage]);

  // Load messages when selected user changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className='flex flex-col items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-gray-500 bg-white/10 h-full max-md:hidden p-4'>
        <img src={assets.logo_icon} alt="Chat App Logo" className='w-12 sm:w-14 lg:w-16'/>
        <p className='text-base sm:text-lg lg:text-xl font-medium text-white text-center'>Chat anytime, anywhere</p>
      </div>
    );
  }

  return (
    <div className='h-full overflow-hidden relative backdrop-blur-lg'>
      {/* Header */}
      <div className='flex items-center gap-2 sm:gap-3 py-3 sm:py-4 px-3 sm:px-4 lg:px-5 border-b border-stone-500 sticky top-0 bg-[#282142]/80 z-10'>
        <img 
          src={selectedUser.profilePic || assets.avatar_icon} 
          alt={selectedUser.fullName} 
          className='w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover flex-shrink-0' 
        />
        <div className='flex-1 min-w-0'>
          <p className='text-sm sm:text-base lg:text-lg text-white flex items-center gap-2 truncate'>
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id) && (
              <span className='w-2 h-2 rounded-full bg-green-500 flex-shrink-0'></span>
            )}
          </p>
          <p className='text-xs sm:text-sm text-gray-400'>
            {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
          </p>
        </div>
        <button 
          onClick={() => setSelectedUser(null)} 
          className='md:hidden p-1 sm:p-2 hover:bg-white/10 rounded-full transition-colors'
          aria-label="Close chat"
        >
          <img src={assets.arrow_icon} alt="Back" className='w-5 sm:w-6'/>
        </button>
        <button className='max-md:hidden p-1 sm:p-2 hover:bg-white/10 rounded-full transition-colors' aria-label="Help">
          <img src={assets.help_icon} alt="Help" className='w-4 sm:w-5'/>
        </button>
      </div>

      {/* Chat messages area */}
      <div className='h-[calc(100%-110px)] sm:h-[calc(100%-120px)] lg:h-[calc(100%-130px)] overflow-y-auto p-3 sm:p-4 lg:p-5 pb-4 sm:pb-6'>
        {messages.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-gray-400'>
            <p className='text-sm sm:text-base'>No messages yet</p>
            <p className='text-xs sm:text-sm mt-1'>Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={`${msg._id || index}`} 
              className={`flex mb-3 sm:mb-4 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[80%] lg:max-w-[75%] ${msg.senderId === authUser._id ? 'flex-row-reverse' : ''}`}>
                {msg.image ? (
                  <img 
                    src={msg.image} 
                    alt="Sent image" 
                    className='max-w-[200px] sm:max-w-[230px] lg:max-w-[280px] max-h-[250px] sm:max-h-[300px] lg:max-h-[350px] border border-gray-700 rounded-lg object-contain'
                  />
                ) : (
                  <div 
                    className={`p-2 sm:p-3 rounded-lg break-words text-sm sm:text-base ${msg.senderId === authUser._id 
                      ? 'bg-violet-600 text-white rounded-br-none' 
                      : 'bg-[#282142] text-white rounded-bl-none'}`}
                  >
                    {msg.text}
                  </div>
                )}
                <div className='flex flex-col items-center flex-shrink-0'>
                  <img 
                    src={msg.senderId === authUser._id 
                      ? authUser?.profilePic || assets.avatar_icon 
                      : selectedUser?.profilePic || assets.avatar_icon} 
                    alt="" 
                    className='w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover'
                  />
                  <p className='text-xs text-gray-500 mt-1 text-center'>
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        {/* <div ref={scrollEnd} /> */}
      </div>

      {/* Message input area */}
      <div className='absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 bg-[#282142]/80'>
        <form onSubmit={handleSendMessage} className='flex items-center gap-2 sm:gap-3'>
          <div className='flex-1 flex items-center bg-gray-100/20 px-3 sm:px-4 rounded-full'>
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input}
              type="text" 
              placeholder='Type a message...'
              className='flex-1 text-sm sm:text-base p-2 sm:p-3 bg-transparent border-none outline-none text-white placeholder-gray-400'
              disabled={isSending}
            />
            <input 
              onChange={handleSendImage} 
              type="file" 
              id='image-upload'
              accept='image/png, image/jpeg, image/gif'
              className='hidden'
              disabled={isSending}
            />
            <label 
              htmlFor="image-upload" 
              className='cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors'
              aria-label="Attach image"
            >
              <img src={assets.gallery_icon} alt="" className='w-4 sm:w-5'/>
            </label>
          </div>
          <button 
            type="submit" 
            disabled={isSending || input.trim() === ""}
            className={`p-2 sm:p-3 rounded-full transition-colors ${isSending || input.trim() === "" ? 'opacity-50' : 'hover:bg-violet-600'}`}
            aria-label="Send message"
          >
            <img src={assets.send_button} alt="" className='w-5 sm:w-6'/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;