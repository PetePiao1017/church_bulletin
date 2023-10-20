import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Button, Dropdown,Tabs, Modal, DatePicker, Row, Col, Card } from 'antd';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import {ArrowLeftOutlined} from '@ant-design/icons';
import { Announcement, ConnectCard, Event, OnlineGiving, OrderOfService, PrayerRequest, Video, Website } from '../../components/SVG';
import "./Main.scss";

const {TabPane} = Tabs;

const Main = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    if(!props.token){
      navigate('/signin', {replace: true})
    }
  },[])

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [date, setDate] = useState("");
  const [newbulletin, setNewbulletin] = useState(false)

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setNewbulletin(true);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onChange = (key) => {
      console.log(key);
  };

  const onDateChange = (date, dateString) => {
    setDate(dateString)
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
            {newbulletin 
              ?
              <div className='new_bulletin'>
                <Row className='main'>
                    <Col span = {12} className='control-panel'>
                      <div> 
                        <p 
                          className='back-link'
                          onClick={ () => setNewbulletin(false)}
                          ><ArrowLeftOutlined />   Back to Bulletin
                        </p>
                      </div>
                        <Row>
                            <Col span = {4} className='menu'>
                                <div className='plus'>
                                </div>
                                <div className='customize' />
                            </Col>
                            <Col span = {20} className='add-section'>
                                <h3>Add a section</h3>
                                <p className='subtitle'>Drag any section below into the phone on the right.</p>
                                <Row gutter={16}>
                                  <Col span = {1} />
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <Announcement />
                                      <p className='category'>Announcement</p>
                                    </Card>
                                  </Col>
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <OrderOfService />
                                      <p className='category'>Order of Service</p>
                                    </Card>
                                  </Col>
                                  <Col span = {1} />
                                </Row>
                                <br />
                                <Row gutter={16}>
                                  <Col span = {1} />
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <Event />
                                      <p className='category'>Event</p>
                                    </Card>
                                  </Col>
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <ConnectCard />
                                      <p className='category'>Connect Card</p>
                                    </Card>
                                  </Col>
                                  <Col span = {1} />
                                </Row>
                                <br />
                                <Row gutter={16}>
                                  <Col span = {1} />
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <PrayerRequest />
                                      <p className='category'>Prayer Request</p>
                                    </Card>
                                  </Col>
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <OnlineGiving />
                                      <p className='category'>Online Giving</p>
                                    </Card>
                                  </Col>
                                  <Col span = {1} />
                                </Row>
                                <br />
                                <Row gutter={16}>
                                  <Col span = {1} />
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <Website />
                                      <p className='category'>Website</p>
                                    </Card>
                                  </Col>
                                  <Col span={11}>
                                    <Card className='draggable' draggable size={"small"}>
                                      <Video />
                                      <p className='category'>Video</p>
                                    </Card>
                                  </Col>
                                  <Col span = {1} />
                                </Row>
                                <br />
                            </Col>
                        </Row>
                    </Col>
                    <Col span = {12} className='show-panel'>
                      <div className='button-group'>
                        <Button type = "primary">Edit</Button>
                        <Button type = "default">Preview</Button>
                      </div>
                      <div className='show-app'>
                        <h1> </h1>
                      </div>
                    </Col>
                </Row>
              </div>
              :
              <div className='main'>
                <Tabs 
                    defaultActiveKey="1" 
                    onChange={onChange}
                    tabBarGutter={40}
                    size = {"large"}
                    style={{marginLeft:"20px"}}
                >
                  <TabPane tab="UPCOMING" key="1">
                    <div className='button-bar'>
                      <Button 
                        type='primary' 
                        style={{float:"right",marginRight:"20px"}}
                        onClick={showModal}
                      >
                        Add New BulletIn
                      </Button>
                    </div>
                  </TabPane>
                  <TabPane tab="PAST" key="2">
                    Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="RESPONSES" key="3">
                    Content of Tab Pane 3
                  </TabPane>  
                </Tabs>
                <Modal
                  title="Add new Bulletin"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <h4>When will this bulletin become active?</h4>
                  <p>This is the date when your bulletin will become publicly visible to anyone who has access to the link or QR code. You can change this later if you’d like.</p>
                  <DatePicker
                    status={!date ? "error" : ""}
                    onChange={onDateChange} 
                    size = {"large"}
                    />
                </Modal>
              </div>
            }
            
        </div>
    )
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
})

export default connect(mapStateToProps)(Main)