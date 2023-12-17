import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Button, Divider, Row, Col,} from 'antd';
import { useNavigate } from "react-router-dom";
import { Device } from '../../components';
import { setDataSource, sendInvitation } from '../../actions/bulletins';

// const { Column } = Table;

const Upcoming = (props) => {
    
    const [upcoming, setUpcoming] = useState([]);

    const[active, setActive] = useState([]);
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [mail, setMail] = useState("");
    const [admin, setAdmin] = useState(false);


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
        let Difference_In_Time = date2.getTime() - date1.getTime(); 
      
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

        return Difference_In_Days;

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
        props.setDataSource();
    },[])

    useEffect(() => {
        if(props.user){
            setUserId(props.user._id);
            setMail(props.user.email);
            setAdmin(props.user.admin);
        }
    },[props.user])

    return(
        <div className='upcoming-container'>
            <div className='new-bulletin-btn'>
                {
                    admin ? 
                    <Button 
                        type='primary' 
                        style={{float:"right",marginRight:"20px"}}
                        onClick={() => props.callback()}
                    >
                        Add New BulletIn
                    </Button>
                    : ""
                }
                {
                    mail === "camaj.robert@gmail.com"
                    ? 
                    <Button 
                        type='primary' 
                        style={{float:"right",marginRight:"20px"}}
                        onClick={() => navigate('/manage', {replace: true})}
                    >
                        User Management
                    </Button>
                    : ""
                }
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


            {/* Modal for invite users with phone number */}
            {/* <Modal title="Invite Users to your bulletin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Table dataSource={tabledata}>
                    <Column title="Full Name" dataIndex="fullName" key="fullName" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Phone Number" dataIndex="phone_number" key="phone_number" />
                    <Column
                        title="Action"
                        key="action"
                        render={(_, record) => (
                            <Space size="middle">
                                <Button 
                                    type = "primary"
                                    disabled = {checkInvited(record.invite)}
                                    onClick={() => {
                                        props.sendInvitation(record.phone_number, church_name, record.id, userId);
                                        let tempArr = [...pending, record.key]
                                        setPending(tempArr);
                                    }}
                                >
                                    {
                                        renderInvitation(record.invite, record.key)
                                        
                                    }
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </Modal> */}


        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.retrieve,
    appuser: state.builletins.appuser,
    user: state.auth.user,
})

export default connect(mapStateToProps, {setDataSource, sendInvitation})(Upcoming);