import React, {useState}  from "react";
import { Button,  Form, Input, Upload,message, DatePicker, TimePicker} from 'antd';
import dayjs from 'dayjs';

import { PictureOutlined, UploadOutlined, } from "@ant-design/icons";

const Eventediting = () => {

    const format = 'HH:mm';

    const [formData, setFormData] = useState({
        title: '',
        bodyText: ''
    });

    const {title, bodyText} = formData;


    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


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
    return (
        <div className="orderofservice">
            <h4 className="top-header">Edit Event</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "BULLETIN TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onChange}
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
                                style={{width: "120%"}}
                            >
                               Upload
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
               
                <Form.Item label = "DATE">
                    <DatePicker
                        onChange={onChange}
                        style={{width:"100%"}}
                    />
                </Form.Item>

                <p>TIME</p>
                    <div style={{display:"flex"}}>
                        <TimePicker 
                            defaultValue={dayjs('12:08', format)} 
                            format={format} 
                        /> -
                        <TimePicker 
                            defaultValue={dayjs('12:08', format)} 
                            format={format} 
                        /> 
                    </div>
                <br />
                <Form.Item label = "LOCATION">
                    <Input.TextArea rows = {2} />
                </Form.Item>

                <Form.Item label = "BODY TEXT">
                    <Input.TextArea rows = {4} />
                </Form.Item>

                <Form.Item label = "BUTTON">
                    <Input  type="text" placeholder="Button Text" style = {{marginBottom:"20px"}}/>
                    <Input  type="text" placeholder="Button Link" />
                </Form.Item>
                
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >
                    Done Editing
                </Button>
            </Form>
        </div>
    )
}

export default Eventediting
