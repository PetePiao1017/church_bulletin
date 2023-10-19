import React from "react";

import { Announcement, OrderOfService, Event, ConnectCard, PrayerRequest, OnlineGiving, Website, Video} from "../SVG";

import './card.scss';


const LoopCard = () => {


    return (
        <div id="card">
            <Announcement />
            <OrderOfService />
            <Event />
            <ConnectCard />
            <PrayerRequest />
            <OnlineGiving />
            <Website />
            <Video />
        </div>
    )
}

export default LoopCard