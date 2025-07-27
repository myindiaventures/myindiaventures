import React, { useState } from 'react'

const Navbar = ({active='home'}) => {

    const navItems = [
        {id: 'home', link: '/home', name:'Home'},
        {id: 'about', link: '/about', name:'About'},
        {id: 'tours', link: '/tours', name:'Tours'},
        {id: 'contact', link: '/contact', name:'Contact'},
    ]

    const [ activePage, setActivePage ] = useState(active)

    return (
        <div
        className='w-full h-[7vh] bg-[#f9f9f9]/10 inset-0 top-0 mt-[3vh] mx-auto rounded-4xl flex justify-between items-center lg:px-[24px] px-[16px]'>
            {/* brand logo */}
            <div
            className='font-[Pacifico] text-3xl'>
                MIV
            </div>

            {/* pages */}
            <ul
            className='h-full flex items-center justify-between w-[50%]'>
                {navItems.map((page, index, array) => (
                    <a 
                    key={page.id}
                    href={page.link}>
                        <li
                        key={page.id}
                        className={`
                            flex items-center justify-between cursor-pointer transition-all duration-300 ease-in-out
                            ${activePage == page.id 
                                ? `font-extrabold bg-[#f9f9f9]/30 px-3 py-1 rounded-2xl`
                                : `font-medium px-3 py-1`

                            }
                        `}>
                            {page.name}
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    )
}

export default Navbar
