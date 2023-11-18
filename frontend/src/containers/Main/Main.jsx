import React, {useEffect, useState} from 'react';
import { v4 as uuidv6 } from 'uuid';
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { Button, Dropdown,Tabs, Modal, DatePicker, Row, Col, notification} from 'antd';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import {ArrowLeftOutlined } from '@ant-design/icons';
import { 
  Addsection, 
  Sectionediting, 
  PreviewSecton, 
  BulletIns, 
  Headerpreview,
} from '../../components';
import Upcoming from '../Upcoming/Upcoming';
import Past from '../Past/Past';
import Response from '../Response/Response';

import {logout} from '../../actions/auth';
import { 
  setHeaderDate, 
  createNewBulletin,
  getBulletins,
  clearReduxStore,
  setCurrentTodoList,
} from '../../actions/bulletins';
import {ExclamationCircleFilled} from "@ant-design/icons";



import "./Main.scss";

const {TabPane} = Tabs;
const { confirm } = Modal;

const Main = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Success',
      description:
        'Your data is successfully saved to the database',
    });
  };
  const navigate = useNavigate();
  const showConfirm = () => {
    confirm({
      title: 'Have you saved the editings?',
      icon: <ExclamationCircleFilled />,
      content: 'You have to save editings before you leave this page',
      onOk() {
      },
      onCancel() {
        setNewbulletin(false)
      },
    });
  };

  const showConfirm_Save = () => {
    confirm({
      title: 'Do you Want to Save Current Work?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        props.createNewBulletin(props.bulletins, props.auth.user._id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token)
    {
      navigate('/signin', {replace : true})
    }
    else
    {
      const decoded = jwtDecode(token);
      let user_id = decoded.user.id;
      props.getBulletins(user_id);
      setUserid(user_id);
    }
  },[])

  useEffect(() => {
    if(props.isAuthenticated === false){
      navigate('/signin', {replace: true})
    }
  },[props.isAuthenticated])


  useEffect(() => {
    if(props.save_success) openNotificationWithIcon('success')
  },[props.save_success])



  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("a");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newbulletin, setNewbulletin] = useState(false);
  const [bulletinItem, setBulletinItem] = useState({});
  const [editingPanel, setEditingPanel] = useState("");
  const [confirmsave, setConfirmsave] = useState(false);
  const [content, setContent] = useState([]);
  const [toolbarvisible, setToolbarVisible] = useState(false);
  const [userid, setUserid] = useState("");
 
  useEffect(() => {
    if(!newbulletin && userid !== "") props.getBulletins(userid);
  },[newbulletin])
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    props.clearReduxStore();
    props.setHeaderDate(date)
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
      
      let type = ev.dataTransfer.getData("id");
      let id = uuidv6();
      let temp = {
        id, type, data: []
      }
      setBulletinItem(temp)
    }
  }


  const onDateChange = (date, dateString) => {
    setDate(dateString);
  };


  const getValueCallback = (id) => {
      let identifier = uuidv6();
      let temp = {
        id: identifier,
        type: id,
        data: []
      }
      setBulletinItem(temp);
  }

  const setEditingpanelCallback = (item) => {
    setEditingPanel(item);
  }

  
  const handleEditorChange = (item, index, value) =>{
    let contentIndex = content.findIndex(element => element.id === item);
    let newObj = {
      type: "edit",
      value: value
    }

    let newContent = {
      id: item,
      data: [
        ...content[contentIndex].data.slice(0, index),
        newObj,
        ...content[contentIndex].data.slice(index+1)
      ]
    }

    setContent([
      ...content.slice(0, contentIndex),
      newContent,
      ...content.slice(contentIndex + 1)
    ])
  }
  const items = [
      {
        key: '1',
        label: (
          <Link to = {'./profile'} >My Account</Link>
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
          <Link onClick={() => props.logout()}>Log out</Link>
        ),
      },
  ];

  const changeToEditSection = (id) => {
    let index = props.retrived_data.findIndex(item => item._id === id);
    setNewbulletin(true);
    props.setCurrentTodoList(props.retrived_data[index]);
  }

    return(
        <div className='main-container'>
          {contextHolder}
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
                      style={{marginTop:"10px"}}
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
                                onClick={ () => {
                                  if(!confirmsave){
                                      showConfirm()
                                  }
                                  else setNewbulletin(false)
                                }}
                              >
                                <ArrowLeftOutlined />   Back to Bulletin
                              </p>
                            :
                              <p 
                                className='back-link'
                                onClick={ () => {
                                  setEditingPanel("")
                                }}
                              >
                                <ArrowLeftOutlined />   Back to Section
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
                              : <Sectionediting 
                                  category = {editingPanel.type}
                                  id = {editingPanel.id}
                                />
                          }
                      </Row>
                    </Col>
                    <Col 
                      span = {16}
                      className='show-panel'
                    >
                      <div className='button-group'>
                        <Button 
                          type = "primary"
                          onClick={() => {
                            setConfirmsave(true);
                            showConfirm_Save();
                            }}
                        >
                          Save
                        </Button>
                        <Button type = "default">Preview</Button>
                      </div>
                      <div
                        className='device-preview'
                        onDragOver={(e) => {e.preventDefault()}} 
                        onDrop={(e) => {onDrop(e, "add")}}
                      >
                        <div className='device'>
                          <div className='border-screen-extra'>             
                            <div 
                              className='device__screen'
                              onMouseDown={() => setToolbarVisible(true)}
                              onMouseLeave={() => setToolbarVisible(false)}
                            >
                              { 
                                  !editingPanel || editingPanel === "Headerediting" 
                                  
                                  ?
                                    <div className='scroll-bar'>
                                      <div onClick={() => setEditingPanel(
                                        {
                                          type: "Headerediting",
                                          title: "Headerediting",
                                          id:'1'
                                        }
                                        )}>
                                        <Headerpreview />
                                      </div>
                                      <div className='bulletins'>
                                        {
                                            <BulletIns
                                              bulletInOneItem = {bulletinItem}
                                              setEditingpanelCallback = {setEditingpanelCallback}
                                              handleEditorChangeCallback = {handleEditorChange}
                                              toolbarvisible = {toolbarvisible}
                                            />
                                        }
                                      </div>
                                    </div>
                                  : 
                                  <div className='device-component'>
                                    <div className='border-screen-extra'>
                                        <div className='tool-right' />
                                        <div className='tool-up' />
                                        <div className='tool-down' />
                                        <div className='border-screen'>
                                          <div className='device__screen'>
                                            <PreviewSecton
                                                category = {editingPanel.type} 
                                                id = {editingPanel.id} 
                                            />
                                          </div>
                                        </div>
                                    </div>
                                    
                                </div>
                              }
                            </div>
                              
                            </div>
                          </div>
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
                    <Upcoming 
                      callback = {showModal}
                      editpageCallback = {(id) => changeToEditSection(id)}
                    />
                  </TabPane>
                  <TabPane tab="PAST" key="2">
                    <Past />
                  </TabPane>
                  <TabPane tab="RESPONSES" key="3">
                    <Response />
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
                    disabledDate={(date) => date && date.valueOf() < Date.now()}
                    />
                </Modal>
              </div>
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  bulletins: state.builletins,
  save_success: state.builletins.save_success,
  retrived_data: state.retrieve.retrived_data,
})

export default connect(mapStateToProps, {
  logout, 
  setHeaderDate,
  createNewBulletin,
  getBulletins,
  clearReduxStore,
  setCurrentTodoList,
})(Main)