import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
        <div className="logo font-bold text-3xl text-[#bbbbc0]" style={{ fontFamily: 'Handjet, sans-serif' }}>
          <span className="text-[#2e2eb8] ">&lt; Cryptic</span>
           Key
          <span className="text-[#2e2eb8] ">/&gt;</span>
          </div>
        <div className='font-bold flex'>
        Created using React, TailwindCSS & Vite
        </div>
     
    </div>
  )
}

export default Footer
