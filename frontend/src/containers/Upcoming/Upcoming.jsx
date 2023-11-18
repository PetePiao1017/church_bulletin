import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Button, Divider, Row, Col} from 'antd';
import { Device } from '../../components';


const Upcoming = (props) => {
    
    const [upcoming, setUpcoming] = useState([]);

    const[past, setPast] = useState([]);

    const [active, setActive] = useState(null);

    const convertDate = () => {
        var x = new Date();
        var y = x.getFullYear().toString();
        var m = (x.getMonth() + 1).toString();
        var d = x.getDate().toString();
        (d.length == 1) && (d = '0' + d);
        (m.length == 1) && (m = '0' + m);
        var yyyymmdd = y +'-'+ m + '-' + d;
        return yyyymmdd;
    }

    const calculateDifferentDays = (dateString) => {
        const date1 = new Date(convertDate());
        const date2 = new Date(dateString);

        // Calculate the time difference in milliseconds
        const timeDifference = date2.getTime() - date1.getTime();

        // Convert the time difference to days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        return daysDifference;

    }

    useEffect(() => {
        if(props.data.retrived_data.length !== 0){
            const todayObj = {
                header_date: convertDate(),
                header_title: "",
                header_imageurl: "",
                usre_id: 'today',
                _id: '',
                todoList: null
            }
            let temp = props.data.retrived_data;

    
            let index = temp.findIndex(item => item.header_date === convertDate());
    
            if(index !== -1) setActive(temp[index])
    
            temp = [...temp, todayObj];

    
            temp.sort((a,b) => {
                const dateA = new Date(a.header_date);
                const dateB = new Date(b.header_date);
    
                return dateA - dateB; 
            });
    
            
            let todayIndex = temp.findIndex(item => item.usre_id === "today");

    
            setUpcoming(temp.slice(todayIndex+1,temp.length));
    
            setPast(temp.slice(0, todayIndex - 1));
        }
    },[props.data])


    return(
        <div className='upcoming-container'>
            <div className='new-bulletin-btn'>
                <Button 
                type='primary' 
                style={{float:"right",marginRight:"20px"}}
                onClick={() => props.callback()}
                >
                Add New BulletIn
                </Button>
            </div>
            <br />
            <Divider />
            <div className='bulletin-preview'>
                <Row>
                    <Col span = {6} style={{padding: "20px"}}>
                        <Device  
                            data = {!active ? past[past.length] : active } 
                            active = {true}
                            editBulleteinCallback = {(id) => props.editpageCallback(id)}
                        />
                    </Col>
                    <Col span = {18}>
                        <Row wrap = {true} style={{padding: "10px", background:"#ECF1F7"}}>
                            {
                                upcoming.map((item, index) => {
                                    return(
                                        <Col 
                                            span = {7} 
                                            style={{marginBottom: "15px"}} 
                                            key={index}
                                        >
                                            <Device
                                                data = {item}
                                                active = {false}
                                                dateDifference = {calculateDifferentDays(item.header_date)}
                                                editBulleteinCallback = {(id) => props.editpageCallback(id)}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.retrieve
})

export default connect(mapStateToProps)(Upcoming);