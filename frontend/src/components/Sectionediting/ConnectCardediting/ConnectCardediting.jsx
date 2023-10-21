import React,{useState} from "react";
import { Button,  Form, Input, Upload,message, Checkbox} from 'antd';
import { PictureOutlined, UploadOutlined } from "@ant-design/icons";
import './ConnectCardediting.scss';

const ConnectCardediting = () => {
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
            <h4 className="top-header">Edit Connect Card</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onChange}
                        placeholder="Connect Card"
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
                <h5>Multiple Chocie Responses</h5>
                <Form.Item label = "QUESTION 1">
                    <Input
                        type = "text"
                        placeholder="I made a question today"
                    />
                </Form.Item>
                <Form.Item label = "OPTIONS">
                    <Input
                        type = "text"
                        placeholder="To Follow Jesus"
                        style={{marginBottom:"20px"}}
                        />
                    <Input
                        type = "text"
                        placeholder="To Redency my life to Jesus"
                        style={{marginBottom:"20px"}}
                        />
                    <Input
                        type = "text"
                        style={{marginBottom:"20px"}}
                        />
                    <Input
                        type = "text"
                        />
                </Form.Item>
                <Form.Item label = "QUESTION 2">
                    <Input
                        type = "text"
                        placeholder="How did you hear about us?"
                    />
                </Form.Item>
                <Form.Item label = "OPTIONS">
                    <Input
                        type = "text"
                        placeholder="Friend/Family"
                        style={{marginBottom:"20px"}}
                        />
                    <Input
                        type = "text"
                        placeholder="Church/Website"
                        style={{marginBottom:"20px"}}
                        />
                </Form.Item>
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >Done Editing</Button>
            </Form>
        </div>
    )
}

export default ConnectCardediting