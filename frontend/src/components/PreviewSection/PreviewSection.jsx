import React from "react";
import Announcepreview from './Announcepreview/Announcepreview';
import Connectcardpreview from './Connectcardpreview/Connectcardpreview';
import Eventpreview from './Eventpreview/Eventpreview';
import Onlinegivingpreview from './Onlinegivingpreview/Onlinegivingpreview';
import Orderofservicepreview from './Orderofservicepreview/Orderofservicepreview';
import Prayerrequest from './Prayerrequest/Prayerrequest';
import Videopreview from './Videopreview/Videopreview';
import Websitepreview from './Websitepreview/Websitepreview';
import Headerpreview from "./Headerpreview/Headerpreview";


const PreviewSection = (props) => {

    switch(props.category){
        case "Headerediting":
            return <Headerpreview />
        case "Announcement":
            return <Announcepreview id = {props.id} />
        case "Connect Card":
            return <Connectcardpreview id = {props.id} />
        case "Event":
            return <Eventpreview id = {props.id} />
        case "Online Giving":
            return <Onlinegivingpreview id = {props.id} />
        case "Order Of Service":
            return <Orderofservicepreview id = {props.id} />
        case "Prayer Request":
            return <Prayerrequest id = {props.id} />
        case "Video":
            return <Videopreview id = {props.id} />
        case "Website":
            return <Websitepreview id = {props.id} />
            
    }
}

export default PreviewSection   