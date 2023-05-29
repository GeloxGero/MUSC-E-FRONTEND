import { Link } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

   

const DashHeader = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    //const onLogOutClicked = () => sendLogout()

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            logout
        </button>
    )

    const content = (
        <header className="header">
            <div className="container">
                {/* <Link to="/dash">
                    <h1 className="dash-header__title">MUSC-E</h1>
                </Link>
                <div className="dash-header__nav">
                    <a href="#">HOME</a>
                    <a href="#">ABOUT</a>
                    <a href="#">PRODUCTS</a>
                    <a href="#">CONTACTS</a>
                </div> */}
                <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/349622438_205025309039704_4318455005088689078_n.png?stp=dst-png_p403x403&_nc_cat=101&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeHC8OJN8jBbBfAI6AFPiEnj4dkD4w52slHh2QPjDnayUZ61TmlJiinG9V5nk9oVmyuNrvm28f7pN5cfosA3Vp3m&_nc_ohc=oUd-1zEUdIsAX9lLZs0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdThqcoHkkMqGTSRy-9WPlE44iits2ruj_J27Gv2Lx3-Mg&oe=649A5CC1"/>
                <div className="navigation">
                    <Link><a>Home</a></Link>
                    <Link><a>About Us</a></Link>
                    <Link><a>Contact Us</a></Link>

                    <Link><a class="cart-button"><i class="fas fa-shopping-cart"></i>CART</a></Link>
                    <Link><a href="#" class="logout-button">Login</a></Link>
                </div>
                

            </div>
        </header>
    )

    return content
}
export default DashHeader



// import { useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
// import { useNavigate, Link, useLocation } from 'react-router-dom'

// import { useSendLogoutMutation } from '../features/auth/authApiSlice'

// const DASH_REGEX = /^\/dash(\/)?$/
// const NOTES_REGEX = /^\/dash\/notes(\/)?$/
// const USERS_REGEX = /^\/dash\/users(\/)?$/

// const DashHeader = () => {

//     const navigate = useNavigate()
//     const { pathname } = useLocation()

//     const [sendLogout, {
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     }] = useSendLogoutMutation()

//     useEffect(() => {
//         if (isSuccess) navigate('/')
//     }, [isSuccess, navigate])

//     if (isLoading) return <p>Logging Out...</p>

//     if (isError) return <p>Error: {error.data?.message}</p>

//     let dashClass = null
//     if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
//         dashClass = "dash-header__container--small"
//     }

//     const logoutButton = (
//         <button
//             className="icon-button"
//             title="Logout"
//             onClick={sendLogout}
//         >
//             <FontAwesomeIcon icon={faRightFromBracket} />
//         </button>
//     )

//     const content = (
//         <header className="dash-header">
//             <div className={`dash-header__container ${dashClass}`}>
//                 <Link to="/dash">
//                     <h1 className="dash-header__title">techNotes</h1>
//                 </Link>
//                 <nav className="dash-header__nav">
//                     {/* add more buttons later */}
//                     {logoutButton}
//                 </nav>
//             </div>
//         </header>
//     )

//     return content
// }
// export default DashHeader