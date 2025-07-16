import { useContext, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from '../../context/AuthContext'

const ProfilePage = () => {


  const {authUser, updateProfile} = useContext(AuthContext)

  const[selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const[name, setName] = useState(authUser?.fullName || "")
  const[bio, setBio] = useState(authUser?.bio || "")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName:name, bio});
      // navigate('/');
      return;
    }
    const reader =  new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      // navigate('/');
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-4 sm:p-6 lg:p-8'>
      <div className='bg-slate-800/80 text-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl w-full flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 xl:gap-20'>
        <div className='w-full lg:w-auto lg:flex-1' >
          <button onClick={()=>navigate("/")} className='bg-blue-600 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700 transition-colors mb-4 sm:mb-6'>Go Back</button>
          <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5 lg:space-y-6'>
            
          <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6'>Profile details</h3>
          
          <div className='flex flex-col items-center'>
            <label htmlFor="avatar" className='cursor-pointer flex flex-col items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity'>
              <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
              <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt="" className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${selectedImg ? 'rounded-full object-cover' : ''} border-2 border-gray-300 hover:border-blue-500 transition-colors`}/>
              <span className='text-blue-400 sm:text-blue-300 font-medium text-xs sm:text-sm'>Upload profile image</span>
            </label>
          </div>
          
          <input 
            onChange={(e)=>setName(e.target.value)} 
            value={name} 
            type="text" 
            required 
            placeholder='Your name'
            className='w-full p-3 sm:p-4 lg:p-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm sm:text-base'
          />
          
          <textarea 
            onChange={(e)=>setBio(e.target.value)} 
            value={bio} 
            placeholder='Write profile bio' 
            required
            rows={3}
            className='w-full p-3 sm:p-4 lg:p-5 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm sm:text-base sm:rows-4'
          />
          
          <button 
            type='submit'
            className='w-full bg-blue-600 text-white py-3 sm:py-4 lg:py-5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base lg:text-lg'
          >
            Save
          </button>
        </form>
        </div>
        <div className='flex justify-center w-full lg:w-auto lg:flex-shrink-0'>
          <img src={authUser?.profilePic || assets.logo_icon} alt="" className={`w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52 aspect-square rounded-full object-cover ${ selectedImg && 'rounded-full' }`}/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage