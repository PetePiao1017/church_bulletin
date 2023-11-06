import React, { useEffect } from "react";
import "./Device.scss"
import { RightOutlined } from "@ant-design/icons";
import { convertDate } from "../../utils/convertDate";


const Device = (props) => {


    return(
       <>
        {
            props.data !== undefined 
            ? 
            <div 
                className='device-component'
                onClick={() => props.editBulleteinCallback()}
            >
                <div className="indicator">
                    <div className={props.active ? "circle-active" : "circle"} />
                    {
                       !props.active ? <h5 className="due-date">{`Active in ${props.dateDifference} days`}</h5>
                       : <h5 className="due-date">Active</h5>
                    }
                </div>
                <div className='border-screen-extra'>
                    <div className='tool-right' />
                    <div className='tool-up' />
                    <div className='tool-down' />
                    <div className='border-screen'>
                        <div className='device__screen'>
                            <div className="scroll-bar">
                                <h4 className="title">{props.data.header_title}</h4>
                                <p className="date">{convertDate(props.data.header_date)}</p>
                                {
                                    props.data.header_imageurl ? 
                                    <div className="header-image">
                                        <img src = {props.data.header_imageurl} />
                                    </div>
                                    : ""
                                }
                                {
                                    props.data.list_category ? props.data.list_category.map((item, index) => {
                                        return(
                                            <div className="category" key = {index}>
                                                <p className="title">{item.title}</p>
                                                <RightOutlined  style={{width:"8px"}}/>
                                            </div>
                                        )
                                    })
                                    :""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : ""
        }
       </>
        
    )
}

export default Device;

