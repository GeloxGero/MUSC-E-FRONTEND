import { Link } from 'react-router-dom'
import Signup from '../features/auth/Signup'
import Login from '../features/auth/Login'
import { useState} from 'react';

const Public = () => {
    const [isLogin, setIsLogin] = useState(false)

    const toggleLogin = () => {setIsLogin(!isLogin)}

    const content = (
        isLogin 
        ? <div className='public '> <div className="filler left" onMouseOut={toggleLogin}></div> <Login dir='left'/></div>
        : <div className='public '> <Signup dir='right'/> <div className="filler right" onMouseOut={toggleLogin}> </div> </div>
    )
    return content
};
export default Public