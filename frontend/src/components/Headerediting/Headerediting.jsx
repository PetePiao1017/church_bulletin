import React, { useState } from 'react';
import {Form, Input, DatePicker, Button, message, Upload} from 'antd';
import { UploadOutlined, PictureOutlined} from '@ant-design/icons';
import "./Headerediting.scss"


const Headerediting = () => {
    
    const [formData, setFormData] = useState({
        title: '',
        date: '',
    });

    const {title, date} = formData;


    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onDateChange = (date, dateString) => {
        console.log(date, dateString)
    }

    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };
    return(
        <Form layout='vertical' className='form-container'>
            <Form.Item label = "BULLETIN TITLE">
                <Input 
                    type = "text"
                    name = "title"
                    value={title}
                    onChange={onChange}
                />
            </Form.Item>
            <Form.Item label = "DATE">
                <DatePicker
                    onChange={onChange}
                    style={{width:"100%"}}
                />
            </Form.Item>
            <Form.Item label = "IMAGE">
                <div className='upload-container'>
                    <Upload 
                        {...props} 
                        className='upload-btn'
                    >
                        <Button 
                            icon={<UploadOutlined />}
                        >
                            Click to Upload
                        </Button>
                    </Upload>
                    <br />
                    <br />
                    <br />
                    <Button 
                        icon={<PictureOutlined />}
                        style={{width: "95%"}}
                    >
                        Stock Image
                    </Button>
                </div>
            </Form.Item>
            <Button 
                type = "primary"
                style={{float:"right"}}    
            >Done Editing</Button>
        </Form>
    )
}


export default Headerediting