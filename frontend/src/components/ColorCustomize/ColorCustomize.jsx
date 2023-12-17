import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Button, ColorPicker, Input, Upload, Space, Table, Checkbox, Modal } from 'antd';
import {
    setHeadingTextColor, 
    setBackgroundColor, 
    setSectionBackgroundColor, 
    setSectionTitleColor, 
    getColorTheme,
    saveColorThemeFormData,
    deleteColor
} from '../../actions/bulletins';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const ColorCustomize = (props) => {
  const [color, setColor] = useState([]);
  const [data, setData] = useState([]);
  const [backgroundFileList, setBackgroundFileList] = useState([]);
  const [sectionFileList, setSectionFileList] = useState([]);
  const [backgroundUpdateFileList, setBackgroundUpdateFileList] = useState([]);
  const [sectionUpdateFileList, setSectionUpdateFileList] = useState([]);

//   Edit State
  const [themename, setThemeName] = useState("");
  const [title, setTitle] = useState("");
  const [section_title, setSectionTitle] = useState("");
  const [background, setBackground] = useState("");
  const [section_backgorund, setSectionBackground] = useState("");

// Create State
  const [newthemename, setNewThemeName] = useState("");
  const [newtitle, setNewTitle] = useState("#1677ff");
  const [new_section_title, setNewSectionTitle] = useState("#1677ff");
  const [new_background, setNewBackground] = useState("#1677ff");
  const [new_section_backgorund, setNewSectionBackground] = useState("#1677ff");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const showModal = (name) => {
    setIsModalOpen(true);
    let index = data.findIndex(item => item.name === name);
    setTitle(data[index].title);
    setSectionTitle(data[index].section_title);
    setBackground(data[index].background);
    setSectionBackground(data[index].section_background);
    setThemeName(data[index].name);
  };

  const showCreateModal = () => {
    setIsCreateModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);

    const  formData = new FormData();
    formData.append('themename', themename);
    formData.append('title', title);
    formData.append('section_title', section_title);
    if(backgroundUpdateFileList.length !== 0) 
      formData.append('background', backgroundUpdateFileList[0].originFileObj);
    else formData.append('background', background);
    if(sectionUpdateFileList.length !== 0) 
      formData.append('sectionbackground', sectionUpdateFileList[0].originFileObj);
    else formData.append('sectionbackground', section_backgorund);

    // props.updateColorThemeFormData(formData)
    //   .then(data => setData(data))
  };

  const handleCreateOk = () => {
    setIsCreateModalOpen(false);

    const  formData = new FormData();
    formData.append('themename', newthemename);
    formData.append('title', newtitle);
    formData.append('section_title', new_section_title);
    if(backgroundFileList.length !== 0) 
      formData.append('background', backgroundFileList[0].originFileObj);
    else formData.append('background', new_background);
    if(sectionFileList.length !== 0) 
      formData.append('sectionbackground', sectionFileList[0].originFileObj);
    else formData.append('sectionbackground', new_section_backgorund);


    props.saveColorThemeFormData(formData)
      .then(data => setData(data))
    
  }

  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => { 
    props.getColorTheme()
        .then(data => setColor(data));
  },[]);

  useEffect(() => {
    let tempArr = [];
    if(color.length !== 0) {
        color.forEach((item, index) => {
            let tempObj = {
                key: index.toString(),
                name: item.name,
                background: item.background,
                section_background: item.section_background,
                title: item.title,
                section_title: item.section_title,
                checked: false
            }
            tempArr.push(tempObj);
        })
        setData(tempArr);
    }
  },[color])

  const onChange = (e) => {
    setThemeName(e.target.value);
  }

  const onNewChange = (e) => {
    setNewThemeName(e.target.value);
  }

  const deleteOne = (name) => {
    props.deleteColor(name);
    let index = data.findIndex(item => item.name === name);
    if(index !== -1) {
        let temp = [...data];
        temp.splice(index, 1);
        setData(temp);
    }
  }

  const columns = [
    {
      title: 'Theme Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'BG',
      dataIndex: 'background',
      key: 'background',
      render: (background) => {
        if(background[0] !== "#"){
          return <img src = {background}  style={{width : "25px"}}/>
        }
        else {
          return <ColorPicker value = {background}  size="small" disabled/>
        }
      }

    },
    {
      title: 'SBG',
      dataIndex: 'section_background',
      key: 'section_background',
      render: (section_background) => {
        if(section_background[0] !== "#"){
          return <img src = {section_background}  style={{width : "25px"}}/>
        }
        else {
          return <ColorPicker value = {section_background}  size="small" disabled/>
        }
      }
    },
    {
      title: 'T',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <ColorPicker value = {title}  size="small" disabled/>
    },
    {
      title: 'ST',
      dataIndex: 'section_title',
      key: 'section_title',
      render: (section_title) => <ColorPicker value = {section_title}  size="small" disabled />
    },
    {
      title: 'Action',  
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' size = "small" onClick={() => showModal(record.name)}>   
            <EditOutlined />
        </Button>
          <Button type='primary' size = "small" danger onClick={() => deleteOne(record.name)}><DeleteOutlined /></Button>
        </Space>
      ),
    },
    {
      title: 'Select',  
      key: 'select',
      render: (_, record) => (
         <Checkbox onChange={(e) => onCheckBoxChange(e, record.name)} checked = {record.checked}/>
      ),
    },
  ];

  const onCheckBoxChange = (e, name) => {
    const checked = e.target.checked;
    let myindex = data.findIndex(item => item.name === name);
    const newData = [];
    if(checked){
        data.forEach((item, index) => {
            if(index !== myindex) {
                let tempObj = {
                    ...data[index],
                    checked: false,
                }
                newData.push(tempObj);
            }
            else {
                let tempObj = {
                    ...data[index],
                    checked: true,
                }
                newData.push(tempObj);
            }
        })

        setData(newData);
        props.setHeadingTextColor('', data[myindex].title);
        props.setBackgroundColor('', data[myindex].background);
        props.setSectionBackgroundColor('', data[myindex].section_background);
        props.setSectionTitleColor('', data[myindex].section_title);
    }
  }

  const onBackgroundUploadChange = ({ fileList: newFileList }) => {
    setBackgroundFileList(newFileList);
  };
  const onBackgroundUpdateUploadChange = ({ fileList: newFileList }) => {
    setBackgroundFileList(newFileList);
  };

  const onSectionUploadChange = ({ fileList: newFileList }) => {
    setSectionFileList(newFileList);
  };
  const onSectionUpdateUploadChange = ({ fileList: newFileList }) => {
    setSectionFileList(newFileList);
  };

  return(
    <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
        <h3> Please choose your preferred Theme</h3>
         <Table columns={columns} dataSource={data} size='small' />
         <span style=
            {{
                color: "#0080FF", 
                fontSize: "15px", 
                cursor: "pointer"
            }}
            onClick={() => showCreateModal()}
        >
                + Add New Color Theme
        </span>
        <Modal title="Edit Your own Color Theme" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <br />
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>Heading Text:</span>
                <ColorPicker value={title} onChange={(value, color) => setTitle(color)} />
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>Background:</span>
                <div>
                    {
                      background && background[0] !== '#'
                      ? <img src = {background}  style={{width: "45px"}} />
                      : <ColorPicker value={background} onChange={(value, color) => setBackground(color)} />
                    }
                </div> 
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>Background Section:</span>
                <div>
                    {
                      section_backgorund && section_backgorund[0] !== '#'
                      ? <img src = {section_backgorund} style={{width: "45px"}} />
                      : <ColorPicker value={section_backgorund} onChange={(value, color) => setBackground(color)} />
                    }
                </div>
                
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>Section Title Text:</span>
                <ColorPicker value={section_title} onChange={(value, color) => setSectionTitle(color)} />
            </div>
            <br />
            <Input 
                type = "text" 
                placeholder = "Input Custom name" 
                value={themename}
                onChange={onChange}
            />
        </Modal>
        <Modal title="Create Your own Color Theme" open={isCreateModalOpen} onOk={handleCreateOk} onCancel={handleCreateCancel}>
            <br />
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>
                    Heading Text:
                </span>
                <ColorPicker value={newtitle} onChange={(value, color) => setNewTitle(color)} />
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>
                    Background:
                </span>
                <div style={{display: "flex", alignItems: "center"}}>
                    {
                        backgroundFileList.length === 0
                        ?
                        <ColorPicker 
                            size = "large" 
                            value={new_background} 
                            onChange={(value, color) => setNewBackground(color)} 
                            style={{marginRight: "20px"}}
                        />
                        : ""
                    }
                    
                    <Upload
                        listType="picture-card"
                        fileList={backgroundFileList}
                        onChange={onBackgroundUploadChange}
                    >
                        Use Custom Texture
                    </Upload>
                </div> 
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>Background Section:</span>
                <div style={{display: "flex", alignItems: "center"}}>
                    {
                        sectionFileList.length === 0
                        ?
                        <ColorPicker 
                            size = "large" 
                            value={new_section_backgorund}
                            onChange={(value, color) => setNewSectionBackground(color)} 
                            style={{marginRight: "20px"}}
                        />
                        : ""
                    }
                    <Upload
                        listType="picture-card"
                        fileList={sectionFileList}
                        onChange={onSectionUploadChange}
                    >
                        Use Custom Texture
                    </Upload>
                </div>
                
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span style={{
                    verticalAlign: "super", 
                    fontSize: "15px",
                    marginLeft: "40px",
                    marginRight: "20px"
                }}>Section Title Text:</span>
                <ColorPicker value={new_section_title} onChange={(value, color) => setNewSectionTitle(color)} />
            </div>
            <br />
            <Input 
                type = "text" 
                placeholder = "Input Custom name" 
                value={newthemename}
                onChange={onNewChange}
            />
        </Modal>
    </div>
)
};

const mapStateToProps = (state) => ({
    bulletins: state.builletins,
})

export default connect(mapStateToProps, {
    setHeadingTextColor,
    setBackgroundColor,
    setSectionBackgroundColor,
    setSectionTitleColor,
    getColorTheme,
    saveColorThemeFormData,
    deleteColor,
})(ColorCustomize);