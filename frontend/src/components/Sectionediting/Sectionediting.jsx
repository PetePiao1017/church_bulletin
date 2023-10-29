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
            return <Headerediting id = {props.id} />
        case "Announcement":
            return <Announceediting id = {props.id} />
        case "Connect Card":
            return <ConnectCardediting id = {props.id} />
        case "Event":
            return <Eventediting id = {props.id} />
        case "Online Giving":
            return <OnlineGivingediting id = {props.id} />
        case "Order Of Service":
            return <OrderOfServiceediting id = {props.id} />
        case "Prayer Request":
            return <PrayerRequestediting id = {props.id} />
        case "Video":
            return <Videoediting id = {props.id} />
        case "Website":
            return <Websiteediting id = {props.id} />
    }
}

export default Sectionediting