import React from "react";
import Announcepreview from './Announcepreview/Announcepreview';
import Connectcardpreview from './Connectcardpreview/Connectcardpreview';
import Eventpreview from './Eventpreview/Eventpreview';
import Onlinegivingpreview from './Onlinegivingpreview/Onlinegivingpreview';
import Orderofservicepreview from './Orderofservicepreview/Orderofservicepreview';
import Prayerrequest from './Prayerrequest/Prayerrequest';
import Videopreview from './Videopreview/Videopreview';
import Websitepreview from './Websitepreview/Websitepreview';


const PreviewSection = (props) => {

    switch(props.category){
        case "Announcement":
            return <Announcepreview />
        case "Connect Card":
            return <Connectcardpreview />
        case "Event":
            return <Eventpreview />
        case "Online Giving":
            return <Onlinegivingpreview />
        case "Order Of Service":
            return <Orderofservicepreview />
        case "Prayer Request":
            return <Prayerrequest />
        case "Video":
            return <Videopreview />
        case "Website":
            return <Websitepreview />
            
    }
}

export default PreviewSection   