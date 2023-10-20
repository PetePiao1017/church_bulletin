import React from 'react'
import './Landingpage.scss'
import { useNavigate } from "react-router-dom";


const Landingpage = (props) => {

    const navigate = useNavigate();

    const signin = () => {
        navigate('./signin')
    }
    return(
        <div className='container'>
            <div className='header'>
                <span className='logo'>Church Bulletin</span>
                <span className='category'>Overview</span>
                <span className='category'>Features</span>
                <span className='category'>Pricing</span>
                <span className='category'>Contact</span>
                <span 
                    className='signin'
                    onClick={() => signin()}
                    >
                        Sign In
                    </span>
            </div>
            <div className='main-word'>
                <p className='main-sentence'>Inspiring people to follow Jesus with </p>
                <h1 style={{margin:0}}>Digital BulleteIn</h1>
            </div>
        </div>
    )
}

export default Landingpage