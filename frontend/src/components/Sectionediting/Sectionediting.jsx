import React, { useEffect } from "react";
import Announceediting from "../Announceediting/Announceediting";
import ConnectCardediting from '../ConnectCardediting/ConnectCardediting';
import Eventediting from '../Eventediting/Eventediting';
import OnlineGivingediting from '../OnlineGivingediting/OnlineGivingediting';
import OrderOfServiceediting from '../OrderOfServiceediting/OrderOfServiceediting';
import PrayerRequestediting from '../PrayerRequestediting/PrayerRequestediting';
import Videoediting from '../Videoediting/Videoediting';
import Websiteediting from '../Websiteediting/Websiteediting';

const Sectionediting = (props) => {
    
    switch(props.category){
        case "Announcement":
            return <Announceediting />
        case "ConnectCard":
            return <ConnectCardediting />
        case "Event":
            return <Eventediting />
        case "OnlineGiving":
            return <OnlineGivingediting />
        case "OrderOfService":
            return <OrderOfServiceediting />
        case "PrayerRequest":
            return <PrayerRequestediting />
        case "Video":
            return <Videoediting />
        case "Website":
            return <Websiteediting />
    }
}

export default Sectionediting