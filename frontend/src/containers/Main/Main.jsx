import React from 'react';
import "./Main.scss";
import { Link } from "react-router-dom";
import { Dropdown,Tabs } from 'antd';

const Main = () => {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
          key: '1',
          label: (
            <Link>My Account</Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link>Help</Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link>Log out</Link>
          ),
        },
    ];
    const items2 = [
        {
          key: '1',
          label: 'Upcoming',
          children: 'Content of Tab Pane 1',
        },
        {
          key: '2',
          label: 'Past',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Responses',
          children: 'Content of Tab Pane 3',
        },
    ];
    return(
        <div className='main-container'>
            <div className='header'>
                <span className='logo'>Church Bulletin</span>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <img 
                      className = "avatar" 
                      src = "./user.png" 
                      alt = "User Avatar"
                      />
                </Dropdown>
            </div>
            <div className='main'>
                <Tabs 
                    defaultActiveKey="1" 
                    items={items2} 
                    onChange={onChange}
                    tabBarGutter={40}
                    size = {"large"}
                    style={{marginLeft:"20px"}}
                />
            </div>
        </div>
    )
}

export default Main