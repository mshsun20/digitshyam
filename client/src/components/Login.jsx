import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const server = 'http://localhost:5050'
    const [acc, setAcc] = useState({})
    let name, value

    const hndlchng = (e) => {
        name = e.target.name
        value = e.target.value
        setAcc({...acc, [name]:value})
    }

    const hndlsub = async (e) => {
        const {acc_email, acc_pass} = acc
        e.preventDefault()
        const res = await axios.post(`${server}/login`, {acc_email, acc_pass})
        const data = await res.data
        console.log(data)
    }

  return (
    <>
        <div className='logpg'>
            <form className='logfrm'>
                <div className="loggrp">
                    <label htmlFor="acc_email">Email Id</label>
                    <input type="text" name='acc_email' id='acc_email' onChange={hndlchng} />
                </div>
                <div className="loggrp">
                    <label htmlFor="acc_pass">Password</label>
                    <input type="text" name='acc_pass' id='acc_pass' onChange={hndlchng} />
                </div>
                <div className="loggrp">
                    <input type="submit" value="Sign In" onClick={hndlsub} />
                </div>
            </form>
            <div className="reglnk">
              To Register Click Here : <NavLink to='/reg' className='rglnk'>Go to Registration Page</NavLink>
            </div>
        </div>
    </>
  )
}

export default Login