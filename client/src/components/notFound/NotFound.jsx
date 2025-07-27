import React from 'react'

const NotFound = () => {
    return (
        <div
        className='w-full h-screen bg-[#0E0E0E] text-[#f9f9f9] flex flex-col justify-center items-center'>
            <h1
            className='lg:text-9xl text-2xl'>
                404
            </h1>
            <p
            className='lg:text-2xl text-sm'>
                Page not found!
            </p>
        </div>
    )
}

export default NotFound
