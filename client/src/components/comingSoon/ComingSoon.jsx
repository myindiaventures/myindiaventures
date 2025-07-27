import React from 'react'
import Navbar from './Navbar'
import NotifySection from './NotifySection'

const ComingSoon = () => {

    const screenWidth = window.innerWidth;

    return (
        <div
        className='w-full h-screen bg-[#0E0E0E] text-[#f9f9f9] flex flex-col lg:px-[80px] px-[16px]'>
            {screenWidth > 450 && (
                <Navbar />  
            )}
            {screenWidth <450 && (
                <div
                className='w-full text-center pt-[5vh] font-[Pacifico] text-3xl'>
                    MIV
                </div>
            )}
            <div
            className='w-full h-screen flex flex-col justify-center items-center'>
                <div
                className='flex flex-col'>
                    <h1
                    className='lg:text-6xl text-4xl font-semibold text-center'>
                        Coming Soon
                    </h1>
                    <p
                    className='text-[#f9f9f9]/60 text-center lg:text-xl text-sm mt-[2vh]'>
                        We're crafting something adventurous, inspiring and unforgettable <i className='text-[#f9f9f9]/50'> ~ just for you</i>
                    </p>
                </div>
                <NotifySection />
            </div>
            
        </div>
    )
}

export default ComingSoon
