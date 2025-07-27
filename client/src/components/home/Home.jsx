import React from 'react'
import { easeInOut, motion } from 'framer-motion'

const Home = () => {

    const screeenHeight = window.innerHeight;
    const yoffset = screeenHeight * 0.4;

  return (
    <div
    className='w-full h-screen bg-[#0E0E0E] flex justify-center items-center text-[#f9f9f9]'>
      <motion.h1
      initial={{ y:0, scale:2.5 }}
      animate={{ y:-yoffset, scale:1}}
      transition={{ delay:1, duration: 1.5, ease:easeInOut}}
      className='text-[3vw] font-semibold'>
        MY INDIA VENTURES
      </motion.h1>
    </div>
  )
}

export default Home
