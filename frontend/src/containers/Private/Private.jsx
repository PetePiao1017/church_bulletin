import React, {useEffect, useState} from 'react';
import { v4 as uuidv6 } from 'uuid';
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { 
  Button, 
  Dropdown,
  Tabs, 
  Modal, 
  DatePicker, 
  Row, 
  Col, 
  notification, 
  Select,
  Form,
  Typography,
  Popconfirm,
  Table,
  InputNumber,
  Input,
} from 'antd';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
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
  setPhoneNumber,
} from '../../actions/bulletins';
import {
  ExclamationCircleFilled, 
  ArrowLeftOutlined,
} from "@ant-design/icons";

import "./Private.scss";

const {TabPane} = Tabs;
const { confirm } = Modal;

const originData = [];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Private = (props) => {
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
        props.createNewBulletin(props.bulletins, props.auth.user._id, "Private");
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
      props.getBulletins(user_id, "Private");
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      church_name: '',
      owner_name: '',
      phone_number: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'church_name',
      dataIndex: 'church_name',
      width: '25%',
      editable: true,
    },
    {
      title: 'owner_name',
      dataIndex: 'owner_name',
      width: '15%',
      editable: true,
    },
    {
      title: 'phone_number',
      dataIndex: 'phone_number',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const showPhoneNumberModal = () => {
    setIsModalOpen(true);
  };

  const phoneNumberhandleOk = () => {
    setIsModalOpen(false);
    props.setPhoneNumber(data);
  };
  const phoneNumberhandleCancel = () => {
    setIsModalOpen(false);
  };
  
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


  const handleAdd = () => {
    let tempObj = {
      key: data.length + 1,
      church_name: "",
      owner_name: "",
      phone_number: "",
    }
    setData([...data, tempObj]);

  }

  return(
        <div className='main-container'>
          {contextHolder}
            <div className="header">
                <span className='logo'>
                  <ArrowLeftOutlined 
                    style={{marginRight: "10px"}}
                    onClick={() => navigate('/main', {replace: true})}
                  />
                    Private
                </span>
                <Dropdown
                    menu={{
                        items,
                    }}
                    className='profile'
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
              </div>
            }
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
            <Modal title="Input Phonenumebr will be private" open={isModalOpen} onOk={phoneNumberhandleOk} onCancel={phoneNumberhandleCancel}>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={data}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel,
                  }}
                />
              </Form>
              <span 
                style={{
                  color:"#3B71CA", 
                  cursor: "pointer"
                }}
                onClick={() => handleAdd()}
              >
                  +Add more
              </span>
            </Modal>
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
  setPhoneNumber,
})(Private)