import React, {useState}  from "react";
import { Button,  Form, Input, Upload,message} from 'antd';
import { PictureOutlined, UploadOutlined,PlusOutlined, } from "@ant-design/icons";

const OrderOfServiceediting = () => {

    const [count, setCount] = useState(['a'])
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
            <h4 className="top-header">Edit Order of Service</h4>
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
                {
                    count.map((item, index) => {
                        return(
                            <>
                                <p>SERVICE TOPIC 
                                    <span 
                                        style={{
                                            color:"#0D6EFD", 
                                            cursor: "pointer", 
                                            float: "right"
                                        }}
                                       
                                    >
                                        Delete
                                    </span>
                                </p>
                                <Input 
                                    type = "text" 
                                    placeholder="Service Topics 101" 
                                    style={{marginBottom:"20px"}}
                                />
                                <Form.Item>
                                    <Input.TextArea rows = {4} />
                                </Form.Item>
                            </>
                        )
                        })
                }
                
                <p 
                    style={{color:"#0D6EFD",cursor: "pointer"}}
                    onClick={() => setCount([...count, "a"])}
                >
                    <PlusOutlined />
                    Add more
                </p>
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

export default OrderOfServiceediting
