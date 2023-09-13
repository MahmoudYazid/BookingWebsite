import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import axios from 'axios'
export default function SignUp() {

    const usernameref = useRef()
    const passwordref = useRef()
    const typeref = useRef("")

    const signupFunc = () => {
        const response = axios.get('https://booking-website-iota.vercel.app/api/signup', {
            headers: {
                name: usernameref.current.value,
                password: passwordref.current.value,
                type: typeref.current.value,
            }

        }).then((res) => {
            console.log(res)
        })

    }
    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input ref={usernameref} type="text" className="login__input" placeholder="User name / Email" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input ref={passwordref}  type="password" className="login__input" placeholder="Password" />
                        </div>
                        
                        <select ref={typeref} className="login__field">
                            <option value={'Doctor'}>Doctor</option>
                            <option value={'patient'}>patient</option>
                        </select>
                        <button onClick={()=>signupFunc()} className="button login__submit">
                            <span className="button__text">Sign up  Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                        <Link className="button login__submit" href={'/'} >
                            <span className="button__text">Back to Login</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </Link>
                    </div>
                    <div className="social-login">
                        
                        <div className="social-icons">
                            <a href="#" className="social-login__icon fab fa-instagram"></a>
                            <a href="#" className="social-login__icon fab fa-facebook"></a>
                            <a href="#" className="social-login__icon fab fa-twitter"></a>
                        </div>
                    </div>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    )
}
