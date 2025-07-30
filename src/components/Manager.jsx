import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setpasswordArray] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const getPasswords = async () => {
        try {
            let req = await fetch("/api/passwords");
            if (!req.ok) {
                throw new Error(`HTTP error! status: ${req.status}`);
            }
            let passwords = await req.json();
            console.log('Loaded passwords:', passwords);
            setpasswordArray(passwords);
        } catch (error) {
            console.error('Error loading passwords:', error);
            toast.error('Failed to load passwords!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    
    useEffect(() => {
        getPasswords()

    }, [])



    const showPassword = () => {
        passwordRef.current.type = "text"
        // alert("icon changed");
        console.log(ref.current.src);
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async() => {
        // Prevent multiple saves by checking if already saving
        if (isSaving) {
            return;
        }

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setIsSaving(true); // Lock the button
            try {
                // if any such id exists in the db, delete it.
                if (form.id) {
                    await fetch("/api/passwords", {method: "DELETE", headers: {"Content-Type":"application/json" }, body: JSON.stringify({id: form.id})});
                }

                const newPassword = { ...form, id: uuidv4() };
                
                const response = await fetch("/api/passwords", {
                    method: "POST", 
                    headers: {"Content-Type":"application/json" }, 
                    body: JSON.stringify(newPassword)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.success) {
                    setpasswordArray([...passwordArray, newPassword]);
                    setform({ site: '', username: '', password: '' });
                    toast.success('Password saved!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    throw new Error('Save failed');
                }
            } catch (error) {
                console.error('Error saving password:', error);
                toast.error('Failed to save password!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } finally {
                setIsSaving(false); // Unlock the button
            }
        }
        else {
            toast.error('Error: All fields must be longer than 3 characters!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const deletePassword = async(id) => {
        console.log("Deleting password with id: ", id)
        let c = confirm("Do you really wish to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
let res = await fetch("/api/passwords", {method: "DELETE", headers: {"Content-Type":"application/json" }, body: JSON.stringify({id})})
            
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const editPassword = (id) => {
        console.log("Editing password with id: ", id)
        setform({...passwordArray.filter(i => i.id === id)[0], id: id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Handjet:wght@100..900&display=swap');
                
                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    height: 50px;
                }

                .dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: #ffffff;
                    will-change: transform;
                    animation: bounce 1.4s ease-in-out infinite both;
                }

                .dot:nth-child(1) { animation-delay: -0.32s; }
                .dot:nth-child(2) { animation-delay: -0.16s; }
                .dot:nth-child(3) { animation-delay: 0s; }

                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }
            `}</style>
            <div className="absolute inset-0 -z-10 w-full h-screen items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>



            <div className="p-3 md:mycontainer min-h-[88vh]">
                <h1 className='text-5xl text text-center font-bold text-[#bbbbc0]' style={{ fontFamily: 'Handjet, sans-serif' }}>
                    <span className="text-[#2e2eb8]">&lt; Cryptic</span>
                    Key
                    <span className="text-[#2e2eb8]">/&gt;</span>
                </h1>
                <p className='text-[#2e2eb8] text-xl text-center' style={{ fontFamily: 'Handjet, sans-serif' }}>Sophisticated Protection, Simplified.</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} type="text" placeholder='Enter website URL' name="site" id="site" className='text-black rounded-full border border-blue-800 w-full py-1 p-4' />
                    <div className="flex flex-col w-full gap-8 md:flex-row">
                        <input value={form.username} onChange={handleChange} type="text" placeholder='Enter Username' name="username" id="username" className='text-black rounded-full border border-blue-800 w-full py-1 p-4' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} type="password" placeholder='Enter Password' name="password" id="password" className='text-black rounded-full border border-blue-800 w-full py-1 p-4' />
                            <span className="absolute right-[3px] top-[1px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    {isSaving ? (
                        <div className="loading-container bg-blue-700 rounded-full px-8 py-2">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    ) : (
                        <button onClick={savePassword} className='gap-2 text-white flex justify-center items-center bg-blue-700 rounded-full px-8 py-2 w-fit hover:bg-blue-500'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{ width: 30, height: 30 }}>
                            </lord-icon>
                            Save Password
                        </button>
                    )}

                </div>
                <div className="passwords ">
                    <h2 className='text-white font-bold text-2xl py-4'>Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white'>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto text-white w-full overflow-hidden rounded-md mb-10">
                        <thead className='bg-[#3535b1] text-white'>
                            <tr>
                                <th className='py-2'>Sites</th>
                                <th className='py-2'>Usernames</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-[#6666df]'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center '>
                                        <div className="flex items-center justify-center">
                                            <a href={item.site} target='_'>{item.site}</a>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#000000">
                                                </lord-icon>
                                            </div></div></td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#000000">
                                                </lord-icon>
                                            </div></div></td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#000000">
                                                </lord-icon>
                                            </div></div></td>
                                    <td className='py-2 border border-white text-center' >
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                colors="primary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="morph"
                                                state="morph-trash-full"
                                                colors="primary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
