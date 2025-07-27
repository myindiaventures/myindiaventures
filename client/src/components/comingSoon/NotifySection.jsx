import React, { useState, useRef} from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
emailjs.init('YOOPDfPqPGQTjm5uJ')

const NotifySection = () => {

    const [ email, setEmail ] = useState('')
    const [ error, setError ] = useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [ success, setSuccess ] = useState(false)

    const handleNotify = () => {
        if (emailRegex.test(email)) {
            emailjs.send(
                "service_icar1kf",
                "template_59mvf01",
                {
                    title:'MIV before launch notify inquiry',
                    email: email
                }
            ).then((res) => {
                alert('message sent successfully')
                setSuccess(true)
                setEmail('')
            }).catch((res) => {
                alert('failed to send message')
            })
        }

    }

    return (
        <div
        className='w-[350px] flex lg:flex-row flex-col justify-between mt-[2vh] items-center'>
            {!success && (
                <div
                className='w-[350px] flex lg:flex-row flex-col justify-between items-center'>
                    <input 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email" 
                    className='w-[250px] h-[50px] border-1 border-[#f9f9f9] px-[8px] rounded-lg text-[#f9f9f9] font-medium'
                    placeholder='Enter your email'/>

                    <button
                    onClick={handleNotify}
                    className='bg-[#f9f9f9] text-[#0E0E0E] font-semibold text-[18px] px-[12px] lg:h-[48px] h-[40px] lg:mt-[0vh] mt-[2vh] rounded-lg cursor-pointer'>
                        Notify
                    </button>
                </div>
            )}
            {success && (
                <p className='text-[18px] font-semibold text-green-400 mx-auto transition-all duration-200 delay-100 ease-in-out'>Request sent successfully !</p>
            )}
            

        </div>
    )
}

export default NotifySection
