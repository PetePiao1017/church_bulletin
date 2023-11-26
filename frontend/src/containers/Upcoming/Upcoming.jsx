import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Button, Divider, Row, Col} from 'antd';
import { Device } from '../../components';


const Upcoming = (props) => {
    
    const [upcoming, setUpcoming] = useState([]);

    const[active, setActive] = useState([]);


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
        const daysDifference = date2.getDate() - date1.getDate();

        return daysDifference;

    }

    const calculateDatedifference = (date, today) => {
        const dateObj = new Date(date);
        const todayObj = new Date(today);
    
        return todayObj.getDate() - dateObj.getDate();
    }

    const compare = (a, b) => {
        if(a.header_date > b.header_date) return 1;
        if(a.header_date < b.header_date) return -1;
        return 0;
    }

    useEffect(() => {
        if(props.data.retrived_data.length !== 0){
            const today = new Date().toISOString().split('T')[0];


            let index = -1;
            let temp = 1000;

            for (let i = 0; i < props.data.retrived_data.length; i++) {
                if (props.data.retrived_data[i].header_date < today) {
                    let difference = calculateDatedifference(props.data.retrived_data[i].header_date, today);
                    if(difference < temp) {
                        temp = difference;
                        index = i;
                    }
                } 
            }
            if(index !== -1){
                setActive(props.data.retrived_data[index]);
                let tempObj = props.data.retrived_data[index];
                props.data.retrived_data.sort(compare);
                index = props.data.retrived_data.findIndex(item => item.header_date === tempObj.header_date);
                setUpcoming(props.data.retrived_data.slice(index + 1));
            }
            else setUpcoming(props.data.retrived_data.reverse())
        }
    },[props.data])

    useEffect(() => {
        console.log("@#@@", upcoming);
    },[upcoming])

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
                        {active.length === 0 
                            ? "" 
                            :
                            <Device  
                                data = {active}
                                active = {true}
                                editBulleteinCallback = {(id) => props.editpageCallback(id)}
                            />
                        }
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