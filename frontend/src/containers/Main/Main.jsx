import React, {useEffect, useState} from 'react';
import { v4 as uuidv6 } from 'uuid';
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Dropdown,Tabs, Modal, DatePicker, Row, Col,} from 'antd';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import {ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';


import { 
  Addsection, 
  Sectionediting, 
  PreviewSecton, 
  BulletIns, 
  Headerpreview,
  FileUpload,
  ImageUpload,
  Toolbar,
  ButtonText,
} from '../../components';
import Upcoming from '../Upcoming/Upcoming';
import Past from '../Past/Past';
import Response from '../Response/Response';

import {logout} from '../../actions/auth';
import { 
  setHeaderDate, 
  sendDataToBack, 
  createNewBulletin,
  getBulletins,
  clearReduxStore,
} from '../../actions/bulletins';
import {ExclamationCircleFilled} from "@ant-design/icons";



import "./Main.scss";

const {TabPane} = Tabs;
const { confirm } = Modal;

const Main = (props) => {
  const navigate = useNavigate();
  const showConfirm = () => {
    confirm({
      title: 'Have you saved the editings?',
      icon: <ExclamationCircleFilled />,
      content: 'You have to save editings before you leave this page',
      onOk() {
        props.sendDataToBack(props.bulletins, localbulletins);
      },
      onCancel() {
        setNewbulletin(false)
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
      setUserid(user_id);
      props.getBulletins(user_id);
    }
  },[])

  useEffect(() => {
    if(props.isAuthenticated === false){
      navigate('/signin', {replace: true})
    }
  },[props.isAuthenticated])

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("a");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newbulletin, setNewbulletin] = useState(false);
  const [localbulletins, setLocalbulletins] = useState([]);
  const [editingPanel, setEditingPanel] = useState("");
  const [confirmsave, setConfirmsave] = useState(false);
  const [userid, setUserid] = useState("");
  const [section, setSection] = useState([]);
  const [content, setContent] = useState([]);
  const [clicked, setClicked] = useState("");


  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    props.createNewBulletin(userid);
    setLocalbulletins([]);
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
      let temp = {
        id: uuidv6(),
        type: type,
        title: type,
      }
      setLocalbulletins([...localbulletins, temp])
    }
  }


  const onDateChange = (date, dateString) => {
    setDate(dateString);
  };


  const getValueCallback = (id) => {
    let temp = {
      id: uuidv6(),
      type: id,
      title: id
    }
    setLocalbulletins([...localbulletins, temp])
  }

  const setEditingpanelCallback = (item) => {
    console.log(item.content)
    setEditingPanel(item.content);
  }

  const setContentValue = (id, type) => {
    let index = content.findIndex(item => item.id === id);
    let newObj = {
      type: type,
      value: null
    }
    let tempObj = {
      id: id,
      data: [...content[index].data, newObj]
    }

    setContent([
      ...content.slice(0, index),
      tempObj,
      ...content.slice(index+1)
    ])
  }

  const handleEditorChange = (item, index, value) =>{
    console.log("item", item)
    let contentIndex = content.findIndex(element => element.id === item);
    console.log("content", content)
    console.log("contentINdex", contentIndex)
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
                            props.sendDataToBack(props.bulletins, localbulletins);
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
                            <div className='device__screen'>
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
                                              bulletins = {localbulletins}
                                              setEditingpanelCallback = {setEditingpanelCallback}
                                            />
                                        }
                                        </div>
                                    </div>
                                  : 
                                  <div className='preview'>
                                  <p 
                                    className='app-back' 
                                    onClick={ () => setEditingPanel("")}
                                    style={{
                                      float: "left", 
                                      marginLeft:"7%", 
                                      fontSize:"8px"
                                    }}
                                  >
                                    <ArrowLeftOutlined />   Back
                                  </p> 
                                  <PreviewSecton
                                    category = {editingPanel.type} 
                                    id = {editingPanel.id} 
                                  />
                                </div>
                              }
                            </div>
                              {
                                section.map((item, index) => {
                                  return(
                                    <Row
                                      key = {index}
                                      className = 'editing-page'
                                      onClick = {() => { setClicked(item)}
                                      }
                                    >
                                      <div className='quill-container'>
                                        {
                                          content[index].data.map((value, index) => {
                                            switch(value.type){
                                              case "edit":
                                                return <ReactQuill 
                                                          theme="snow" 
                                                          value={value.value}
                                                          onChange={(value) => 
                                                            handleEditorChange(item, index, value)}
                                                          key = {index}
                                                        />
                                              case "gallery":
                                                return <ImageUpload 
                                                          key = {index}
                                                          index = {"image" + item + index}
                                                        />
                                              case "attach":
                                                return <FileUpload
                                                          key = {index}
                                                          index = {"attach" + item + index}
                                                          />
                                              case "cursor":
                                                return <ButtonText
                                                            key={index}
                                                            />
                                            }
                                          })
                                        }
                                      </div>
                                      {
                                        clicked === item 
                                          ? 
                                          <Toolbar
                                            id = {item}
                                            setContentValueCallback = {setContentValue}
                                          /> 
                                          : ""
                                      }
                                    </Row>
                                  )
                                })
                              }
                              <br />
                              <br />
                              <br />
                              <Row className='add-section-btn'>
                                <Button 
                                  type='default' 
                                  size='large'
                                  onClick={ () => {
                                    let id = uuidv6();
                                    setSection([...section, id]);
                                    let tempObj = {
                                      id: id,
                                      data: []
                                    }
                                    setContent([...content, tempObj])
                                  }}
                                >
                                  <PlusOutlined />
                                  Add Section
                                </Button>
                              </Row>
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
                      editpageCallback = {() => setNewbulletin(true)}
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
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  bulletins: state.builletins
})

export default connect(mapStateToProps, {
  logout, 
  setHeaderDate,
  sendDataToBack,
  createNewBulletin,
  getBulletins,
  clearReduxStore,
})(Main)