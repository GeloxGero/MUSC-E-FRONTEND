import Signup from '../features/auth/Signup'
import Login from '../features/auth/Login'

const Public = ({method}) => {
    const content = (
        (method === "signup") 
        ?   <div className='public '>
                <div className="filler left">
                    <Login dir='left'/>
                </div> 
        
            </div> 
        :   <div className='public '> 
                <div className="filler right">
                    <Signup dir='right'/> 

                </div> 
            </div>
    )
    return content
};
export default Public