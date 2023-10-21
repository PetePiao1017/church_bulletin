import React,{useState} from "react";
import { Button,  Form, Input, Upload,message, Checkbox} from 'antd';
import { PictureOutlined, UploadOutlined } from "@ant-design/icons";

const PrayerRequestediting = () => {
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
    return(
        <div className="announcment">
            <h4 className="top-header">Edit Prayer Request</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onChange}
                        placeholder="Prayer Request"
                    />
                </Form.Item>
                <Form.Item label = "BODY TEXT">
                    <Input.TextArea rows = {4} />
                </Form.Item>

                <Form.Item label = "SELECT FIELDS TO INCLUDE">
                        <Checkbox>Name</Checkbox>    
                </Form.Item>
                <Form.Item>
                    <Checkbox>Email</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox>PhoneNumber</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox>Address</Checkbox>
                </Form.Item>
                <Form.Item label = "ADDITIONAL OPTIONS"></Form.Item>
                <Form.Item>
                    <Checkbox>Indicate Conditional</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Checkbox>Indicate desire to be contacted</Checkbox>
                </Form.Item>
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >Done Editing</Button>
            </Form>
        </div>
    )
}

export default PrayerRequestediting