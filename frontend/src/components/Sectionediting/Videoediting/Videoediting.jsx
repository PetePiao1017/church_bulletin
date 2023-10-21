import React,{useState} from "react";
import { Button,  Form, Input, Select,message} from 'antd';

const Videoediting = () => {
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
            <h4 className="top-header">Edit Video</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "Video">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label = "BODY TEXT">
                    <Input.TextArea rows = {4} />
                </Form.Item>
                <Form.Item label = "Video Platform">
                    <Select value="Other">
                        <Select.Option value="demo">Facebook</Select.Option>
                        <Select.Option value="demo">Twitter</Select.Option>
                        <Select.Option value="demo">Youtube</Select.Option>
                        <Select.Option value="demo">Vimeo</Select.Option>
                        <Select.Option value="demo">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label = "Video Link">
                    <Input type = "text" placeholder="yourwebsite.com" />
                </Form.Item>
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >Done Editing</Button>
            </Form>
        </div>
    )
}

export default Videoediting