import React from "react";
import './Orderofservicepreview.scss';

const Orderofservicepreview = () => {
    return(
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header'>Order of Service</h3>
                <div className='app-image'>
                    <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                </div>
                <div className="service-topic">
                    <h3 className="topic-header">Service Topics 101</h3>
                    <p className="topic-content">Add, edit and delete your service topics using the panel on the left.</p>
                </div>
                <div className="keep-everyone">
                    <h3 className="topic-header">Keep everyone in the Loop</h3>
                    <p className="topic-content">List your music, scripture, guests and more!</p>
                </div>
            </div>
    )
}

export default Orderofservicepreview