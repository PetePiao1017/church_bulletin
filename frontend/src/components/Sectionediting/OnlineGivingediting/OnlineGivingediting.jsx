import React,{useState} from "react";
import { Button,  Form, Input, message, Select} from 'antd';

const OnlineGivingediting = () => {
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
            <h4 className="top-header">Edit Online Giving</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onChange}
                        placeholder="Onling Giving"
                    />
                </Form.Item>

                <Form.Item label = "BODY TEXT">
                    <Input.TextArea rows = {4} />
                </Form.Item>
                
                <Form.Item label = "Display Online Giving via">
                    <Select>
                        <Select.Option value="demo">Embed website</Select.Option>
                        <Select.Option value="demo">Link to your onling givng page</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input 
                        type="text"
                        placeholder="yourwebsite.com"
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

export default OnlineGivingediting