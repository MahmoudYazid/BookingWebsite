import axios from 'axios'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'

export default function Login() {
    const checkCOOKIE=()=>{
        if(getCookie('idcard')){
            router.push('/dashboard')
        }
    }
    useEffect(()=>{
        checkCOOKIE()
    },[])
    const router = useRouter()

    const usernameref = useRef()
    const passwordref = useRef()

    const loginFunc = () => {
        const response =  axios.get('http://localhost:3000/api/login',{
            headers:{
                name: usernameref.current.value,
                password: passwordref.current.value,
            }
            
        }).then((res)=>{
            
            if (res['data'].res !='Null'){
                router.push('/dashboard')
            }
        })
        
    }

  return (
      <div className="container">
          <div className="screen">
              <div className="screen__content">
                  <div className="login">
                      <div className="login__field">
                          <i className="login__icon fas fa-user"></i>
                          <input ref={usernameref} type="text" className="login__input" placeholder="User name / Email"/>
                      </div>
                      <div className="login__field">
                          <i className="login__icon fas fa-lock"></i>
                          <input ref={passwordref} type="password" className="login__input" placeholder="Password"/>
                      </div>
                      <button onClick={()=>loginFunc()} className="button login__submit">
                          <span className="button__text">Log In Now</span>
                          <i className="button__icon fas fa-chevron-right"></i>
                      </button>
                      <Link className="button login__submit" href={'/signuppage'} >
                          <span   className="button__text">SignUp </span>
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
