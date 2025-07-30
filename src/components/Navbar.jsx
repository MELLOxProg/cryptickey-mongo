import React from 'react'

const Navbar = () => {
  return (
    <div>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&display=swap');
</style>
      
      <nav className="text-white">
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-20 ">
        <div className="logo font-bold text-3xl text-[#bbbbc0]" style={{ fontFamily: 'Handjet, sans-serif' }}>
          <span className="text-[#2e2eb8] ">&lt; Cryptic</span>
           Key
          <span className="text-[#2e2eb8] ">/&gt;</span>
          </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
                <a className='hover:font-bold' href="#">Services</a>
            </li>
        </ul> */}
        <div>
          <a href="https://github.com/MELLOxProg" target="_blank" rel="noopener noreferrer">
            <button className="text-white rounded-full flex justify-between items-center ring-white ring-1 hover:bg-[#2e2eb8] hover:ring-[#2e2eb8] transition-all duration-300 cursor-pointer">
              <img className='invert w-10 p-1' src="icons/github.svg" alt="GitHub" />
              <span className="font-bold px-2">GitHub</span>
            </button>
          </a>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
