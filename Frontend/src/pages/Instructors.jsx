import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../hooks/useaxiosFetch';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';


const Instructors = () => {
  const[instructors,setInstructors] = useState([])
  const axiosFetch = useAxiosFetch();
  useEffect(() =>{
      axiosFetch.get('/instructors').then((data) => {
          setInstructors(data.data)
      }).catch((err) => {console.log(err)})
  },[])
  console.log(instructors)
return (
  <div className='md:w-[80%] mx-auto my-36'>
  <div>
      <h1 className=' text-5xl font-bold text-center'>Our <span className='text-secondary'>Best</span> Instructors</h1>
      <div className=' w-[40%] text-center mx-auto my-5'>
          <p className=' text-gray-500'>Explore our popular Instructors. Here is some popular classes based on How many student enrolled</p>
      </div>
  </div>
  {
      instructors ? <>
      <div className=' grid mb-28 md:grid-cols-3 lg:grid-cols-4 w-[90%] gap-4 mx-auto mt-20 '>{
          instructors?.slice(0,4).map((instructor, i)=>(
              <div className=' flex dark:text-white hover:translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md'>
                  <div className=' flex-col flex gap-6 md:gap-8 ' >
                  <img className=' rounded-full h-24 w-24 mx-auto' src={instructor?.photoUrl || `${img}`} alt={instructor?.name} />

                  </div>
                  <div className=' flex flex-col text-center  '>
                      <p className=' font-medium text-lg dark:text-white text-gray-800'>{instructor?.name}</p>
                      <p className=' text-gray-500'>Instructor</p>
                      <p className=' text-gray-500 mb-4'>Address: {instructor?.address }</p>
                      <p className=' text-gray-500 mb-4 '>Telephone: {instructor?.phone }</p>
                      <p className=' text-gray-500 mb-4 '>Email: {instructor?.email }</p>
                  </div>
                  <div  className=' flex flex-row items-center gap-6 mx-auto text-secondary text-2xl' >
                  <AiFillFacebook />
                  <FaLinkedin/>
                  <AiFillInstagram />
                  </div>

              </div>
          ))
          }
          </div></> : <></>
  }


</div>
)
}

export default Instructors