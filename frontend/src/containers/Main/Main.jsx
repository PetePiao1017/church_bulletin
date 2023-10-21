import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Button, Dropdown,Tabs, Modal, DatePicker, Row, Col,} from 'antd';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import {ArrowLeftOutlined } from '@ant-design/icons';
import { Addsection, Sectionediting, PreviewSecton, BulletIns } from '../../components';

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
  const [section, setSection] = useState(false);
  const [newbulletin, setNewbulletin] = useState(false)
  const [localbulletins, setLocalbulletins] = useState([]);
  const [editingPanel, setEditingPanel] = useState("");

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


  const onDrop = (ev, method) => {
    if(method == "add") {
      let id = ev.dataTransfer.getData("id");
      setLocalbulletins([...localbulletins, id])
    }
  }


  const onDateChange = (date, dateString) => {
    setDate(dateString)
  };

  const onSectionChange = () => {
    if(!section)
      setSection(!section);
  }



  const getValueCallback = (id) => {
    setLocalbulletins([...localbulletins, id])
  }

  const setEditingpanelCallback = (item) => {
    setEditingPanel(item.content);
  }
  
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
                    <Col span = {8} className='control-panel'>
                      <div>
                        {
                          !editingPanel
                            ? 
                              <p 
                              className='back-link'
                              onClick={ () => setNewbulletin(false)}
                              ><ArrowLeftOutlined />   Back to Bulletin
                              </p>
                            :
                              <p 
                              className='back-link'
                              onClick={ () => setEditingPanel("")}
                              ><ArrowLeftOutlined />   Back to Section
                              </p>
                        }
                        
                      </div>
                      <Row>
                          <Col span = {4} className='menu'>
                              <div className='plus'>
                              </div>
                              <div className='customize' />
                          </Col>
                          {
                            !editingPanel 
                              ? <Addsection getValueCallback = {getValueCallback} />
                              : <Sectionediting category = {editingPanel} />
                          }
                      </Row>
                    </Col>
                    <Col 
                      span = {16} 
                      className='show-panel' 
                    >
                      <div className='button-group'>
                        <Button type = "primary">Edit</Button>
                        <Button type = "default">Preview</Button>
                      </div>
                      <div 
                        className='show-app' 
                        onDragOver={(e) => {e.preventDefault()}} 
                        onDrop={(e) => {onDrop(e, "add")}}
                      >
                        { 
                          !editingPanel || editingPanel === "Headerediting" ?
                          <div className='scroll-bar'>
                            <h1 className='app-header'>Jesus Bulletin</h1>
                            <h5 className='app-date'>October 24, 2023</h5>
                            <div 
                              className='app-image'
                              onClick={() => setEditingPanel("Headerediting")}
                              >
                              <img 
                                src = "./gallery.png"  
                                style={{width:"50px"}}
                                alt = "Gallery Image"
                              />
                            </div>
                            <div className='bulletins'>
                              {
                                  <BulletIns 
                                    bulletins = {localbulletins}
                                    setEditingpanelCallback = {setEditingpanelCallback}
                                  />
                              }
                              </div>
                          </div>
                          : 
                          <div className='preview'>
                            <p className='app-back' onClick={ () => setEditingPanel("")}>
                              <ArrowLeftOutlined />   Back
                            </p> 
                            <PreviewSecton category = {editingPanel} />
                          </div>
                        }
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