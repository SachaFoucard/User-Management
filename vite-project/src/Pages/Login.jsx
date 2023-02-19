import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UsersContext } from '../Context/UsersContext'
import dataDirector from '../../public/data/director.json'

export default function Login() {
    //CONTEXT
    const { users } = useContext(UsersContext)

    //Local Storage
    const [localstorage, setLocalStorage] = useState([]);
    //data Director
    const [director, setDataDirector] = useState({});

    //Use Navigate
    let navigate = useNavigate()

    const [loginMail, setLoginMail] = useState(''); // mail input from user
    const [loginPassword, setLoginPassword] = useState('') // password input from user

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user'));
        setLocalStorage((prev) => [...prev, items])
        setDataDirector(dataDirector)
    }, [])

    //function to login
    const LoginUser = () => {
        if (director[0]?.password1 == loginPassword && director[0]?.email == loginMail) {
            navigate(`/directorProfil/${director[0].email}`);
            alert(`account found `)
        }
        let u = users.find((item) => item.email == loginMail && item.password1 == loginPassword)
        if (u != undefined && u != null) // first connexion 
        {
            navigate(`/profil/${u.email}`);
            alert(`account found `)
        }
        if (u == undefined) { // second connexion (localstorage) 
            if (localstorage[0] != undefined || localstorage[0] != null) {
                let uLocal = localstorage.find((item) => item.email == loginMail && item.password1 == loginPassword)
                navigate(`/profil/${uLocal.email}`);
                alert(`account found `)
            }
        }
    }


    return (
        <>
            <div className="login-box">
                <h2>Welcome back</h2>
                <p>Enter your details</p>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e) => setLoginMail(e.target.value)} placeholder="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={(e) => setLoginPassword(e.target.value)} id="password" placeholder="Your password" required />
                </div>
                <div className='btns-login'>
                    <button href="#" onClick={LoginUser} className="btn">Log In</button>
                    <Link to="/register" className="forgot">Register</Link>
                </div>
            </div>
        </>
    )
}
