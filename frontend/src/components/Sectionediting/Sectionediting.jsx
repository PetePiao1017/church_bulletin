import React from "react";
import Announceediting from "./Announceediting/Announceediting";
import ConnectCardediting from './ConnectCardediting/ConnectCardediting';
import Eventediting from './Eventediting/Eventediting';
import OnlineGivingediting from './OnlineGivingediting/OnlineGivingediting';
import OrderOfServiceediting from './OrderOfServiceediting/OrderOfServiceediting';
import PrayerRequestediting from './PrayerRequestediting/PrayerRequestediting';
import Videoediting from './Videoediting/Videoediting';
import Websiteediting from './Websiteediting/Websiteediting';
import Headerediting from "./Headerediting/Headerediting";

const Sectionediting = (props) => {
    
    switch(props.category){
        case "Headerediting":
            return <Headerediting />
        case "Announcement":
            return <Announceediting />
        case "Connect Card":
            return <ConnectCardediting />
        case "Event":
            return <Eventediting />
        case "Online Giving":
            return <OnlineGivingediting />
        case "Order Of Service":
            return <OrderOfServiceediting />
        case "Prayer Request":
            return <PrayerRequestediting />
        case "Video":
            return <Videoediting />
        case "Website":
            return <Websiteediting />
    }
}

export default Sectionediting